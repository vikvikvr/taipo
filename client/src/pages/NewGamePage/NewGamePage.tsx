import './NewGamePage.scss';
import React, { useEffect } from 'react';
import { GameModes } from 'pages/NewGamePage/GameModes';
import { PlayerBadge } from 'pages/NewGamePage/PlayerBadge';
import { NavigationIcon } from 'components/NavigationIcon';
import { roomId$ } from 'services/gameService';
import { signOut } from 'services/authService';
import { debug } from 'app/App';

// main page that contains the 3 game modes
// also shows a badge if the player is signed in

export function NewGamePage() {
  useEffect(clearRoomId, []);

  function clearRoomId() {
    roomId$.next('');
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      debug && console.log('failed to sign out', error);
    }
  }

  return (
    <div className="new-game-page">
      <h1 className="page-title">New game</h1>
      <div className="content">
        <GameModes />
      </div>
      <NavigationIcon toPath="/" icon="home" />
      <PlayerBadge onClick={handleSignOut} />
    </div>
  );
}
