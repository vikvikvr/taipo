import { BehaviorSubject } from 'rxjs';
import { GameState, Player } from '../../../server/types/types';

export const emptyGameState: GameState = {
  id: '',
  players: [],
  started: false,
  startedAt: 0,
  typos: [],
  sentence: '',
  mistakeBlockDuration: 1_000
};

export const roomId$ = new BehaviorSubject('');
export const game$ = new BehaviorSubject<GameState>(emptyGameState);
export const blocked$ = new BehaviorSubject({ myself: false, opponent: false });

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
