import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GameResult } from '../../../server/types/types';
import { serverUri } from 'services/socketService';

// custom hook used to fetch a game result
// before showing it on the game over screen

// TODO: move this back inside <GameOverPage>
export function useGameResult(gameId: string) {
  const [result, setResult] = useState<GameResult | null>(null);
  const history = useHistory();

  useEffect(fetchResult, [gameId, history]);

  // TODO: handle differently for solo game result

  function fetchResult() {
    function redirect() {
      history.replace('/game/new');
    }
    if (!gameId) {
      redirect();
      return;
    }
    setTimeout(() => {
      axios
        .get<GameResult>(`${serverUri}/results/${gameId}`)
        .then(({ data: result }) => setResult(result))
        .catch((error) => redirect());
    }, 1_500);
  }

  return result;
}
