import express from 'express';
import { getResult } from './controllers/games.controller';

const router = express.Router();

// routes

const port = process.env.PORT;

router.get('/results/:gameId', getResult);
router.get('/', (req, res) => {
  res.send(`Server started on port ${port}`);
});

export default router;
