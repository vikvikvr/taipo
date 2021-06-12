import mongoose from './database';
import {
  GameResult as IGameResult,
  Player,
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

// helper functions

function makePlayerResult(
  player: Player,
  sentenceLength: number
): IPlayerResult {
  return {
    name: player.name,
    completionPercent: (player.letterIndex / (sentenceLength - 1)) * 100,
    email: player.email,
    typosCount: player.mistakesCount,
    imageUrl: player.imageUrl
  };
}

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

  return {
    gameId: game.id,
    winnerResult: makePlayerResult(winner, length),
    loserResult: loser ? makePlayerResult(loser, length) : undefined
  };
}

export { GameResult };
