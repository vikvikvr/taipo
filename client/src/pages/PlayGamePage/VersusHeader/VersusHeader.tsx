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
      <h2 className="left-name">{isGuest ? 'Guest' : leftName}</h2>
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
              <AloneIcon className="alone-icon" />
              <RunningIcon className="running-icon" />
            </>
          )}
        </div>
      </div>
      {rightName && <h2 className="right-name">{rightName}</h2>}
    </div>
  );
}
