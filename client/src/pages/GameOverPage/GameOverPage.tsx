import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchResult } from 'services/gameService';
import { ResultsTable } from 'pages/GameOverPage/ResultsTable';
import './GameOverPage.scss';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { KeyboardIcon } from 'assets/icons';
import { SlidingButton } from 'components/SlidingButton';
import { background } from 'services/audioService';
import { GameResult } from '../../../../server/types/types';

// reached after a game ends
// fetches game result from server and shows it in a table

export function GameOverPage() {
  const [result, setResult] = useState<GameResult | null>(null);
  const history = useHistory();
  useEffect(fetchGameResult, [history]);
  useEffect(playBgMusic, []);

  function fetchGameResult() {
    fetchResult()
      .then((result) => setResult(result))
      .catch(() => history.replace('/game/new'));
  }

  function playBgMusic() {
    if (!background.playing()) {
      background.play();
    }
  }

  // <SlidingButton> is being animated by <ResultsTable>
  return (
    <div className="game-over-page">
      <h1 className="page-title">Game over!</h1>
      {result && (
        <div className="content">
          <ResultsTable result={result} />
          <Link to="/game/new">
            <SlidingButton
              Icon={KeyboardIcon}
              onClick={() => {}}
              text="New Game"
              variant="parallax"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
