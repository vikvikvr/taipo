import { useEffect } from 'react';
import { User } from 'services/authService';
import { emit } from 'services/socketService';
import { GameState } from '../../../server/types/types';

// custom hook to make user carl@email.com
// play automagically

// ⚠ only used to record demo video

export function useCheating(game: GameState, user: User | null) {
  useEffect(automaticPlay, [game.id, user?.email, game.sentence]);

  function automaticPlay() {
    let done = false;

    if (!user?.email) {
      return;
    }

    if (user.email.includes('carl')) {
      // after a delay
      setTimeout(async () => {
        // press the correct keys automatically
        for (let i = 0; i < game.sentence.length; i++) {
          if (done) {
            break;
          }
          const char = game.sentence[i];
          emit('keyPressed', user.email, char, game.id);
          const timeToWait = 300 + Math.random() * 300;
          await sleep(timeToWait);
        }
      }, 4_000);
    }
    return () => {
      done = true;
    };
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), ms);
  });
}
