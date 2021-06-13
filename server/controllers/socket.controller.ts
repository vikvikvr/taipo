import { Game } from '../game/Game';
import {
  Controller,
  ClientEvent,
  ServerEvent,
  GameResult as IGameResult,
  PlayerInfo
} from '../types/types';
import { find, findIndex } from 'lodash';
import { Sentence } from '../models/Sentence';
import { GameResult, gameResultFromGame } from '../models/GameResult';

// stores in memory current active games
export const games: Game[] = [];

// stores in memory single-player game results
export const results: IGameResult[] = [];

// stores in memory not-yet-started games (vs. random opponent)
const lobby: Game[] = [];

export const handleConnection: Controller = (socket) => {
  // bind socket events coming from client to handlers

  socket.on('disconnect', onDisconnect);
  socket.on<ClientEvent>('codeRequest', onCodeRequest);
  socket.on<ClientEvent>('joinRoom', onJoinRoom);
  socket.on<ClientEvent>('requestSnapshot', onRequestSnapshot);
  socket.on<ClientEvent>('keyPressed', onKeyPressed);
  socket.on<ClientEvent>('enterLobby', onEnterLobby);
  socket.on<ClientEvent>('leaveLobby', onLeaveLobby);
  socket.on<ClientEvent>('playAlone', onPlayAlone);
  socket.on<ClientEvent>('leaveRoom', onLeaveRoom);

  // <ClientEvent> handlers

  function onDisconnect() {
    removeGame('lobby');
    const game = removeGame('games');
    removeGameCleanup(game);
  }

  function onLeaveRoom() {
    const game = removeGame('games');
    removeGameCleanup(game);
  }

  async function onPlayAlone(playerInfo: PlayerInfo) {
    try {
      const game = await createGame(playerInfo);
      games.push(game);
      socket.join(game.id);
      socket.emit<ServerEvent>('joinedRoom', game.id);
      startGame(game, 1);
    } catch (error) {
      // probably also need to notify the client, in the future
      console.log('failed to create solo game', error);
    }
  }

  function onEnterLobby(playerInfo: PlayerInfo) {
    if (lobby.length > 0) {
      startLobbyGame(playerInfo);
    } else {
      createLobbygame(playerInfo);
    }
  }

  function onLeaveLobby() {
    removeGame('lobby');
  }

  async function onCodeRequest(playerInfo: PlayerInfo) {
    try {
      const game = await createGame(playerInfo);
      games.push(game);
      socket.join(game.id);
      socket.emit<ServerEvent>('joinedRoom', game.id);
    } catch (error) {
      console.log('failed to create game from code request', error);
    }
  }

  function onJoinRoom(roomId: string, playerInfo: PlayerInfo) {
    socket.join(roomId);
    const game = find(games, { id: roomId });
    if (game) {
      game.addPlayer(socket.id, playerInfo);
      broadcastEvent('joinedRoom', game.id, game.id);
      startGame(game, 2);
    }
  }

  function onRequestSnapshot(roomId: string) {
    const game = find(games, { id: roomId });
    if (game) {
      socket.emit<ServerEvent>('gameSnapshot', game);
    }
  }

  function onKeyPressed(letter: string, roomId: string) {
    const game = find(games, { id: roomId });

    if (!game || !game.started) {
      return;
    }

    const outcome = game.processLetter(letter, socket.id);

    switch (outcome) {
      case 'still-waiting':
        return;
      case 'wrong':
        handleWrongKey(game);
        break;
      case 'game-over':
        handleGameOver(game);
        break;
      case 'correct':
        socket.emit<ServerEvent>('correctKey');
        break;
    }

    broadcastEvent('gameSnapshot', roomId, game);
  }

  // helper functions

  function handleWrongKey(game: Game) {
    broadcastEvent('wrongKey', game.id, socket.id);
    setTimeout(() => {
      broadcastEvent('canContinue', game.id, socket.id);
    }, game.mistakeBlockDuration);
  }

  function handleGameOver(game: Game) {
    broadcastEvent('gameOver', game.id);
    const ix = findIndex(games, { id: game.id });
    games.splice(ix, 1);
    console.log(`${game.id} > game ended `);
    saveGameResult(game);
  }

  async function createGame(playerInfo: PlayerInfo): Promise<Game> {
    const roomCode = createRandomId();
    // error handling is done inside the caller
    const sentences = await Sentence.find();
    const game = new Game(roomCode, sentences);
    game.addPlayer(socket.id, playerInfo);
    return game;
  }

  function broadcastEvent(event: ServerEvent, roomId: string, ...args: any) {
    socket.emit(event, ...args);
    socket.to(roomId).emit(event, ...args);
  }

  function startGame(game: Game, minPlayers: number) {
    if (game.players.length === minPlayers) {
      const startDelay = 3_000;
      game.startedAt = Date.now() + startDelay;
      broadcastEvent('startingSoon', game.id, game.id);
      setTimeout(() => {
        game.start();
        broadcastEvent('gameSnapshot', game.id, game);
      }, startDelay);
    } else {
      console.log('not enough players to start a game', minPlayers);
    }
  }

  function removeGameCleanup(game: Game | null): void {
    if (!game) {
      return;
    }
    saveGameResult(game);
    broadcastEvent('gameOver', game.id);
  }

  async function createLobbygame(playerInfo: PlayerInfo) {
    try {
      const game = await createGame(playerInfo);
      socket.join(game.id);
      lobby.push(game);
      console.log(`${game.id} > game added to lobby`);
    } catch (error) {
      console.log('failed to create lobby game', error);
    }
  }

  function startLobbyGame(playerInfo: PlayerInfo) {
    const game = lobby.pop();

    if (!game) {
      console.log('failed to start game because lobby was empty');
      return;
    }

    // prevent from playing with myself
    if (socket.id === game.players[0].socketId) {
      return;
    }

    socket.join(game.id);
    game.addPlayer(socket.id, playerInfo);
    games.push(game);
    setTimeout(() => {
      broadcastEvent('joinedRoom', game.id, game.id);
      startGame(game, 2);
    }, 1500);
  }

  function removeGame(from: 'lobby' | 'games'): Game | null {
    const collection = from === 'lobby' ? lobby : games;

    for (let i = 0; i < collection.length; i++) {
      const { players } = collection[i];
      const hasPlayer = find(players, { socketId: socket.id });

      if (hasPlayer) {
        const gameIndex = i;
        const game = collection[gameIndex];
        console.log(`${game.id} > remove game`);
        collection.splice(gameIndex, 1);
        return game;
      }
    }

    return null;
  }

  async function saveGameResult(game: Game) {
    const result = gameResultFromGame(game);

    // save single player results only in memory
    if (game.players.length < 2) {
      results.push(result);
      return;
    }

    // save multi player results to database
    try {
      await GameResult.create(result);
    } catch (error) {
      console.log('failed to save game result to database', error);
    }
  }
};

// Probably needs a more robust method, but MVP calls 😊
function createRandomId(): string {
  const randomNumber = Math.floor(Math.random() * 10 ** 10);
  return randomNumber.toString(16).toUpperCase();
}
