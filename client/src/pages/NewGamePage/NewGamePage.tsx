import './NewGamePage.scss';
import React, { useEffect } from 'react';
import { GameModes } from 'pages/NewGamePage/GameModes';
import { PlayerBadge } from 'pages/NewGamePage/PlayerBadge';
import { NavigationIcon } from 'components/NavigationIcon';
import { useAuthentication } from 'hooks/useAuthentication';
import { roomId$ } from 'services/gameService';

// main page that contains the 3 game modes
// alone - random - friend
// also shows a badge if the player is signed in

export function NewGamePage() {
  const { signOut } = useAuthentication();
  useEffect(clearRoomId, []);

  function clearRoomId() {
    roomId$.next('');
  }

  return (
    <div className="new-game-page">
      <h1 className="page-title">New game</h1>
      <div className="content">
        <GameModes />
      </div>
      <NavigationIcon toPath="/" icon="home" />
      <PlayerBadge onClick={signOut} />
    </div>
  );
}
