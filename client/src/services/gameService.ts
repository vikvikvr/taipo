import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { sleep } from 'utils/helpers';
import { GameResult, GameState, Player } from '../../../server/types/types';
import { serverUri } from './socketService';

export const emptyGameState: GameState = {
  id: '',
  players: [],
  started: false,
  startedAt: 0,
  typos: [],
  sentence: '',
  mistakeBlockDuration: 1_000
};

// behaviour subjects

export const roomId$ = new BehaviorSubject('');
export const game$ = new BehaviorSubject<GameState>(emptyGameState);
export const blocked$ = new BehaviorSubject({ myself: false, opponent: false });

// helper functions

export function distinguishPlayers(players: Player[], username: string) {
  if (players.length === 1) {
    return {
      myself: players[0],
      opponent: null
    };
  }
  if (players[0].username === username) {
    return {
      myself: players[0],
      opponent: players[1]
    };
  }

  return {
    myself: players[1],
    opponent: players[0]
  };
}

export async function fetchResult(gameId: string) {
  if (!gameId) {
    throw new Error('missing gameId');
  }

  await sleep(1_500);
  const url = `${serverUri}/results/${gameId}`;
  const { data: result } = await axios.get<GameResult>(url);
  return result;
}
