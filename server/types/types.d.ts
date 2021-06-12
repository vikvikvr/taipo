import { Socket } from 'socket.io';
declare type IoListener = (socket: Socket) => void;
declare type SocketController = (socket: Socket) => (...args: any[]) => void;
export declare type Controller = IoListener | SocketController;
export declare type ClientEvent = 'keyPressed' | 'codeRequest' | 'requestSnapshot' | 'enterLobby' | 'leaveLobby' | 'surrender' | 'playAlone' | 'leaveRoom' | 'joinRoom';
export declare type ServerEvent = 'startingSoon' | 'correctKey' | 'playerLeft' | 'wrongKey' | 'canContinue' | 'joinedRoom' | 'gameSnapshot' | 'gameOver';
export declare type LetterOutcome = 'still-waiting' | 'wrong' | 'correct' | 'game-over';
export interface Sentence {
    correct: string;
    withMistakes: string;
}
export interface Player {
    username: string;
    letterIndex: number;
    lastMistakeAt: number;
    mistakesCount: number;
    socketId: string;
    imageUrl: string;
    id: string;
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
export interface PlayerResult {
    name: string;
    email: string;
    imageUrl: string;
    completionPercent: number;
    typosCount: number;
}
export interface GameResult {
    winnerResult: PlayerResult;
    loserResult: PlayerResult;
    gameId: string;
}
export {};
