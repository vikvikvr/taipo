import React from 'react';
import './VersusHeader.scss';
import { AloneIcon, RunningIcon, FriendIcon } from 'assets/icons';
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

  const Icon = rightName ? FriendIcon : AloneIcon;
  const containerClass = 'versus-header ' + (rightName ? '' : 'alone');
  leftName = isGuest ? 'Guest' : leftName;

  return (
    <div className={containerClass}>
      <h2 className="left-name">{leftName}</h2>
      <div
        className="middle"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="square" />
        <div className="vs">
          <Icon className="not-hovered-icon" />
          <RunningIcon className="hovered-icon" />
        </div>
      </div>
      {rightName && <h2 className="right-name">{rightName}</h2>}
    </div>
  );
}
