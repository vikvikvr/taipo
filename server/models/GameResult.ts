import mongoose from './database';
import {
  GameResult as IGameResult,
  PlayerResult as IPlayerResult
} from '../types/types';
import { Game } from '../game/Game';

// schemas

const playerResultSchema = new mongoose.Schema<IPlayerResult>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, required: true },
  completionPercent: { type: Number, required: true },
  typosCount: { type: Number, required: true }
});

const gameResultSchema = new mongoose.Schema<IGameResult>({
  winnerResult: { type: playerResultSchema, required: true },
  loserResult: { type: playerResultSchema },
  gameId: { type: String, required: true }
});

// model

const GameResult = mongoose.model<IGameResult>('GameResult', gameResultSchema);

// helper function

export function gameResultFromGame(game: Game): IGameResult {
  let winner = game.players[0];
  let loser = game.players[1];

  // distinguish winner from loser
  if (loser) {
    if (loser.letterIndex > winner.letterIndex) {
      [winner, loser] = [loser, winner];
    }
  }

  const { length } = game.sentence;

  // there is always at least 1 player
  const gameResult: IGameResult = {
    gameId: game.id,
    winnerResult: {
      name: winner.id,
      completionPercent: (winner.letterIndex / (length - 1)) * 100,
      email: winner.id,
      typosCount: winner.mistakesCount,
      imageUrl: winner.imageUrl
    }
  };

  // but there could also be a second one
  if (loser) {
    gameResult.loserResult = {
      name: loser.id,
      completionPercent: (loser.letterIndex / (length - 1)) * 100,
      email: loser.id,
      typosCount: loser.mistakesCount,
      imageUrl: loser.imageUrl
    };
  }

  return gameResult;
}

export { GameResult };
