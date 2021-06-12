import React from 'react';
import './VersusHeader.scss';
import { AloneIcon, RunningIcon } from 'assets/icons';
import { useAnimation } from './VersusHeader.gsap';

interface Props {
  leftName: string;
  rightName: string;
  isGuest: boolean;
  onClick(): void;
}

// at the top of the game screen
// shows the player(s) name(s)
// can be clicked to leave the current game

export function VersusHeader({ leftName, rightName, isGuest, onClick }: Props) {
  const { setHovered } = useAnimation();

  return (
    <div className={`versus-header ${!rightName ? ' alone' : ''}`}>
      <div className="name left">{isGuest ? 'Guest' : leftName}</div>
      <div
        className="middle"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="square" />
        <div className="vs">
          {rightName ? (
            'vs'
          ) : (
            <>
              <AloneIcon className="alone" />
              <RunningIcon className="running" />
            </>
          )}
        </div>
      </div>
      {rightName && <div className="name right">{rightName}</div>}
    </div>
  );
}
