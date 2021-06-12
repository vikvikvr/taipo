import express from 'express';
import { getResult } from './controllers/games.controller';

const router = express.Router();

// routes

router.get('/results/:gameId', getResult);

export default router;
