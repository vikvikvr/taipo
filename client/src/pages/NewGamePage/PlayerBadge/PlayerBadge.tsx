import { useSubject } from 'hooks/useSubject';
import React, { useState } from 'react';
import { playSound } from 'services/audioService';
import { user$ } from 'services/authService';
import { useAnimation } from './PlayerBadge.gsap';
import './PlayerBadge.scss';

interface Props {
  onClick(): void;
}

// only visible if a player is logged in

export function PlayerBadge({ onClick }: Props) {
  // used for fade out animation without losing user's image and name
  const [user] = useSubject(user$);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  useAnimation(Boolean(user), isLoggingOut);

  function handleClick() {
    playSound('mouseClick');
    setIsLoggingOut(true);
    setTimeout(onClick, 500);
  }

  return (
    <div className="player-badge" onClick={handleClick}>
      <img
        className="user-image"
        alt="user badge"
        src={user?.imageUrl}
        draggable={false}
      />
    </div>
  );
}
