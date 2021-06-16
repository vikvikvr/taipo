import { results } from './socket.controller';
import { RequestHandler } from 'express';
import { GameResult } from '../models/GameResult';
import { debug } from '..';

export const getResult: RequestHandler = async (req, res) => {
  const { gameId } = req.params;

  // try to find it first inside local results (single player)
  const result = results.find((res) => res.gameId === gameId);
  if (result) {
    res.send(result);
    return;
  }

  // if not found, query database
  try {
    const result = await GameResult.findOne({ gameId });
    if (result) {
      res.send(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    debug && console.log('failed to get game result from database', error);
    res.sendStatus(500);
  }
};
