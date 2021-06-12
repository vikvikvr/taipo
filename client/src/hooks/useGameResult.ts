import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GameResult } from '../../../server/types/types';
import { fetchResult } from 'services/gameService';

// custom hook used to fetch a game result
// before showing it on the game over screen

// TODO: move this back inside <GameOverPage>
export function useGameResult(gameId: string) {
  const [result, setResult] = useState<GameResult | null>(null);
  const history = useHistory();

  useEffect(fetchResultOld, [gameId, history]);

  function fetchResultOld() {
    fetchResult(gameId)
      .then((result) => setResult(result))
      .catch(() => history.replace('/game/new'));
  }

  return result;
}
