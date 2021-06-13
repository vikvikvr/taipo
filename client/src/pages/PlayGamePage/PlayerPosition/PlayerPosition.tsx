import React from 'react';
import './PlayerPosition.scss';
import { useAnimation } from './PlayerPosition.gsap';

interface Props {
  imageUrl: string;
  position: number;
  isBlocked: boolean;
}

// a badge that shows the player's picture
// moves based on the relative distance between players

export function PlayerPosition({ imageUrl, position, isBlocked }: Props) {
  const { container, img } = useAnimation(position, isBlocked);
  const imgClass = isBlocked ? 'blocked' : '';

  return (
    <div className="position-track">
      <div className="player-position" ref={container}>
        <img
          alt="player badge"
          src={imageUrl}
          className={imgClass}
          ref={img}
          draggable={false}
        />
      </div>
    </div>
  );
}
