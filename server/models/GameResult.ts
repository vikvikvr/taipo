import mongoose from './database';
import {
  GameResult as IGameResult,
  PlayerResult as IPlayerResult
} from '../types/types';
import { Game } from '../game/Game';

const playerResultSchema = new mongoose.Schema<IPlayerResult>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, required: true },
  completionPercent: { type: Number, required: true },
  typosCount: { type: Number, required: true }
});

const gameResultSchema = new mongoose.Schema<IGameResult>({
  winnerResult: { type: playerResultSchema, required: true },
  loserResult: { type: playerResultSchema, required: true },
  gameId: { type: String, required: true }
});

const GameResult = mongoose.model<IGameResult>('GameResult', gameResultSchema);

export function gameResultFromGame(game: Game): IGameResult {
  // distinguish winner from loser
  let winner = game.players[0];
  let loser = game.players[1];
  if (loser.letterIndex > winner.letterIndex) {
    [winner, loser] = [loser, winner];
  }
  // create player results
  const { length } = game.sentence;
  const winnerResult: IPlayerResult = {
    name: winner.id,
    completionPercent: (winner.letterIndex / (length - 1)) * 100,
    email: winner.id,
    typosCount: winner.mistakesCount,
    imageUrl: winner.imageUrl
  };
  const loserResult: IPlayerResult = {
    name: loser.id,
    completionPercent: (loser.letterIndex / (length - 1)) * 100,
    email: loser.id,
    typosCount: loser.mistakesCount,
    imageUrl: loser.imageUrl
  };
  return { gameId: game.id, winnerResult, loserResult };
}

export { GameResult };
