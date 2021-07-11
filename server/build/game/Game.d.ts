import { GameState, LetterOutcome, Player, PlayerInfo, Sentence } from '../types/types';
export declare class Game implements GameState {
    id: string;
    players: Player[];
    sentence: string;
    startedAt: number;
    started: boolean;
    typos: number[];
    readonly mistakeBlockDuration = 500;
    constructor(id: string, sentences: Sentence[]);
    start(): void;
    removePlayer(socketId: string): void;
    addPlayer(socketId: string, playerInfo: PlayerInfo): void;
    processLetter(letter: string, socketId: string): LetterOutcome;
}
