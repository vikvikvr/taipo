import { Socket } from 'socket.io';
export declare type ClientEvent = 'keyPressed' | 'codeRequest' | 'requestSnapshot' | 'enterLobby' | 'leaveLobby' | 'playAlone' | 'leaveRoom' | 'joinRoom';
export declare type ServerEvent = 'startingSoon' | 'correctKey' | 'wrongKey' | 'canContinue' | 'joinedRoom' | 'gameSnapshot' | 'gameOver';
export declare type LetterOutcome = 'still-waiting' | 'wrong' | 'correct' | 'game-over';
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
export interface GuestPlayer {
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
declare type IoListener = (socket: Socket) => void;
declare type SocketController = (socket: Socket) => (...args: any[]) => void;
export declare type Controller = IoListener | SocketController;
export {};
