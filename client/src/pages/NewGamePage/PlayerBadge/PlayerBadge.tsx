import { mouseClick } from 'services/audioService';
import React, { useState } from 'react';
import { User } from 'services/authService';
import { useAnimation } from './PlayerBadge.gsap';
import './PlayerBadge.scss';

interface Props {
  user: User | null;
  onClick(): void;
}

// only visible if a player is logged in

export function PlayerBadge({ user, onClick }: Props) {
  // used for fade out animation without losing user's image and name
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  useAnimation(Boolean(user), isLoggingOut);

  function handleClick() {
    mouseClick.play();
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
