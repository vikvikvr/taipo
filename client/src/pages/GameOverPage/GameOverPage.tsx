import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSubject } from 'hooks/useSubject';
import { roomId$ } from 'services/gameService';
import { useGameResult } from 'hooks/useGameResult';
import { ResultsTable } from 'pages/GameOverPage/ResultsTable';
import './GameOverPage.scss';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { KeyboardIcon } from 'assets/icons';
import { SlidingButton } from 'components/SlidingButton';
import { background } from 'services/audioService';

// reached after a game ends
// fetches the game result from the server
// then shows it on a table

export function GameOverPage() {
  const [roomId] = useSubject(roomId$);
  const result = useGameResult(roomId);
  useEffect(playBgMusic, []);

  function playBgMusic() {
    if (!background.playing()) {
      background.play();
    }
  }

  if (!result) {
    return (
      <div className="game-over-page">
        <h1>Game over!</h1>
        <div className="content">
          <LoadingSpinner />
          <p>loading game result</p>
        </div>
      </div>
    );
  }

  // note that <SlidingButton> is being
  // animated by <ResultsTable>
  return (
    <div className="game-over-page">
      <h1>Game over!</h1>
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
    </div>
  );
}
