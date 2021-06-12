import { results } from './socket.controller';
import { RequestHandler } from 'express';
import { GameResult } from '../models/GameResult';

export const getResult: RequestHandler = async (req, res) => {
  const { gameId } = req.params;
  try {
    // TODO: handle differently for solo game
    const result = await GameResult.findOne({ gameId });
    if (result) {
      res.send(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log('failed to get game result from database', error);
    res.sendStatus(500);
  }
};
