import mongoose from './database';
import { GameResult as IGameResult } from '../types/types';
import { Game } from '../game/Game';
declare const GameResult: mongoose.Model<IGameResult, {}, {}>;
export declare function gameResultFromGame(game: Game): IGameResult;
export { GameResult };
