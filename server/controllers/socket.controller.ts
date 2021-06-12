import { Game } from '../game/Game';
import { Controller, ClientEvent, ServerEvent } from '../types/types';
import { find, findIndex } from 'lodash';
import { Sentence } from '../models/Sentence';
import { GameResult, gameResultFromGame } from '../models/GameResult';

export const games: Game[] = [];
export const results: Game[] = [];

const lobby: Game[] = [];

export const handleConnection: Controller = (socket) => {
  socket.on('disconnect', onDisconnect);
  socket.on<ClientEvent>('codeRequest', onCodeRequest);
  socket.on<ClientEvent>('joinRoom', onJoinRoom);
  socket.on<ClientEvent>('requestSnapshot', onRequestSnapshot);
  socket.on<ClientEvent>('keyPressed', onKeyPressed);
  socket.on<ClientEvent>('enterLobby', onEnterLobby);
  socket.on<ClientEvent>('leaveLobby', onLeaveLobby);
  socket.on<ClientEvent>('playAlone', onPlayAlone);
  socket.on<ClientEvent>('leaveRoom', onLeaveRoom);
  socket.on<ClientEvent>('surrender', onLeaveRoom);

  // <ClientEvent> handlers

  function onDisconnect() {
    removeGame('lobby', 'socketId', socket.id);
    const game = removeGame('games', 'socketId', socket.id);
    removeGameCleanup(game);
  }

  function onLeaveRoom(userId: string) {
    const game = removeGame('games', 'username', userId);
    removeGameCleanup(game);
  }

  async function onPlayAlone(userId: string, imageUrl: string) {
    if (!userId) {
      return;
    }
    try {
      const game = await createGame(userId, imageUrl);
      games.push(game);
      socket.join(game.id);
      socket.emit<ServerEvent>('joinedRoom', game.id);
      startGame(game, 1);
    } catch (error) {
      // probably also need to notify the client, in the future
      console.log('failed to create solo game', error);
    }
  }

  function onEnterLobby(userId: string, imageUrl: string) {
    if (!userId) {
      return;
    }
    if (lobby.length > 0) {
      startLobbyGame(userId, imageUrl);
    } else {
      createLobbygame(userId, imageUrl);
    }
  }

  function onLeaveLobby(userId: string) {
    removeGame('lobby', 'username', userId);
  }

  async function onCodeRequest(userId: string, imageUrl: string) {
    if (!userId) {
      console.log('code request without userId');
      return;
    }
    try {
      const game = await createGame(userId, imageUrl);
      games.push(game);
      socket.join(game.id);
      socket.emit<ServerEvent>('joinedRoom', game.id);
    } catch (error) {
      console.log('failed to create game from code request', error);
    }
  }

  function onJoinRoom(roomId: string, userId: string, imageUrl: string) {
    socket.join(roomId);
    const game = find(games, { id: roomId });
    if (game) {
      game.addPlayer(userId, socket.id, imageUrl, userId);
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

  function onKeyPressed(playerId: string, letter: string, roomId: string) {
    const game = find(games, { id: roomId });

    if (!game || !game.started) {
      return;
    }

    const outcome = game.processLetter(playerId, letter);

    switch (outcome) {
      case 'still-waiting':
        return;
      case 'wrong':
        handleWrongKey(playerId, game);
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

  function handleWrongKey(playerId: string, game: Game) {
    broadcastEvent('wrongKey', game.id, playerId);
    setTimeout(() => {
      broadcastEvent('canContinue', game.id, playerId);
    }, game.mistakeBlockDuration);
  }

  function handleGameOver(game: Game) {
    broadcastEvent('gameOver', game.id);
    const ix = findIndex(games, { id: game.id });
    games.splice(ix, 1);
    console.log(`${game.id} > game ended `);
    results.push(game);
  }

  async function createGame(userId: string, imageUrl: string): Promise<Game> {
    const roomCode = createRandomId();
    // error handling is done inside the caller
    const sentences = await Sentence.find();
    const game = new Game(roomCode, sentences);
    game.addPlayer(userId, socket.id, imageUrl, userId);
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

  async function createLobbygame(userId: string, imageUrl: string) {
    try {
      const game = await createGame(userId, imageUrl);
      socket.join(game.id);
      lobby.push(game);
      console.log(
        `lobby > new game | ${game.id} | player ${userId} | count ${lobby.length} `
      );
    } catch (error) {
      console.log('failed to create lobby game', error);
    }
  }

  function startLobbyGame(userId: string, imageUrl: string) {
    const game = lobby.pop()!;
    // because i don't want to play with myself
    if (userId === game.players[0].username) {
      return;
    }
    socket.join(game.id);
    game.addPlayer(userId, socket.id, imageUrl, userId);
    games.push(game);
    setTimeout(() => {
      broadcastEvent('joinedRoom', game.id, game.id);
      startGame(game, 2);
    }, 1500);
  }

  function removeGame(
    from: 'lobby' | 'games',
    by: 'username' | 'socketId',
    value: string
  ): Game | null {
    const collection = from === 'lobby' ? lobby : games;

    for (let i = 0; i < collection.length; i++) {
      const { players } = collection[i];
      const hasPlayer = players.find((p) => p[by] === value);

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
    results.push(game);
    if (game.players.length < 2) {
      return;
    }
    const result = gameResultFromGame(game);
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
