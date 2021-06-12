import { Socket } from 'socket.io';

// socket events - sent by client

export type ClientEvent =
  | 'keyPressed'
  | 'codeRequest'
  | 'requestSnapshot'
  | 'enterLobby'
  | 'leaveLobby'
  | 'playAlone'
  | 'leaveRoom'
  | 'joinRoom';

// socket events - sent by server

export type ServerEvent =
  | 'startingSoon'
  | 'correctKey'
  | 'wrongKey'
  | 'canContinue'
  | 'joinedRoom'
  | 'gameSnapshot'
  | 'gameOver';

// game related

export type LetterOutcome = 'still-waiting' | 'wrong' | 'correct' | 'game-over';

export interface Sentence {
  correct: string;
  withMistakes: string;
}

export interface PlayerInfo {
  name: string;
  email: string;
  imageUrl: string;
}

export interface Player extends PlayerInfo {
  socketId: string;
  letterIndex: number;
  lastMistakeAt: number;
  mistakesCount: number;
}

export interface GameState {
  players: Player[];
  sentence: string;
  typos: number[];
  id: string;
  startedAt: number;
  started: boolean;
  mistakeBlockDuration: number;
}

// results related

export interface PlayerResult {
  name: string;
  email: string;
  imageUrl: string;
  completionPercent: number;
  typosCount: number;
}

export interface GameResult {
  winnerResult: PlayerResult;
  loserResult?: PlayerResult;
  gameId: string;
}

// socket related

type IoListener = (socket: Socket) => void;
type SocketController = (socket: Socket) => (...args: any[]) => void;

export type Controller = IoListener | SocketController;
