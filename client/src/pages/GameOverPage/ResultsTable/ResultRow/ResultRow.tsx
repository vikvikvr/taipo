import { PlayerResult } from '../../../../../../server/types/types';
import { StarIcon } from 'assets/icons';
import avatarPlaceholder from 'assets/images/avatarPlaceholder.png';
import './ResultRow.scss';
import React from 'react';
import { useAnimation } from './ResultRow.gsap';

interface Props {
  playerResult: PlayerResult;
  isWinner?: boolean;
  isGuest?: boolean;
}

export function ResultRow({ playerResult, isWinner, isGuest }: Props) {
  useAnimation();

  const imageSrc = playerResult.imageUrl || avatarPlaceholder;
  const completion = `${Math.round(playerResult.completionPercent)}%`;
  const name = isGuest ? 'Guest' : playerResult.name;

  return (
    <div className="result-row">
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
