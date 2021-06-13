import { PlayerResult } from '../../../../../../server/types/types';
import { StarIcon } from 'assets/icons';
import avatarPlaceholder from 'assets/images/avatarPlaceholder.png';
import './ResultRow.scss';
import React from 'react';

interface Props {
  playerResult: PlayerResult;
  isWinner?: boolean;
  isGuest?: boolean;
}

export function ResultRow({ playerResult, isWinner, isGuest }: Props) {
  const imageSrc = playerResult.imageUrl || avatarPlaceholder;
  const completion = `${Math.round(playerResult.completionPercent)}%`;
  const name = isGuest ? 'Guest' : playerResult.name;
  const containerClass = 'result-row ' + (isWinner ? 'winner' : 'loser');

  return (
    <div className={containerClass}>
      <h2 className="name">{name}</h2>
      <div className="badge">
        {isWinner && (
          <div className="stars">
            <StarIcon className="star" />
            <StarIcon className="star" />
            <StarIcon className="star" />
          </div>
        )}
        <img alt="player badge" src={imageSrc} draggable={false} />
      </div>
      <p className="sentence">{completion}</p>
      <p className="taipos">{playerResult.typosCount}</p>
    </div>
  );
}
