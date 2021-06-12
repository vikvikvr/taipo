import './NewGamePage.scss';
import React, { useEffect } from 'react';
import { useSubject } from 'hooks/useSubject';
import { roomId$ } from 'services/gameService';
import { GameModes } from 'pages/NewGamePage/GameModes';
import { user$ } from 'services/authService';
import { PlayerBadge } from 'pages/NewGamePage/PlayerBadge';
import { NavigationIcon } from 'components/NavigationIcon';
import { useAuthentication } from 'hooks/useAuthentication';
import { background } from 'services/audioService';

// main page that contains the 3 game modes
// alone - random - friend
// also shows a badge if the player is signed in

export function NewGamePage() {
  const [user] = useSubject(user$);
  const { signOut } = useAuthentication();
  useEffect(resetRoomId, []);
  useEffect(startBackgroundMusic, []);

  function startBackgroundMusic() {
    if (!background.playing()) {
      background.play();
    }
  }

  function handleSignOut() {
    signOut();
  }

  function resetRoomId() {
    roomId$.next('');
  }

  return (
    <div className="new-game-page">
      <h1 className="page-title">New game</h1>
      <div className="content">
        <GameModes isLoggedIn={Boolean(user)} />
      </div>
      <NavigationIcon toPath="/" icon="home" />
      <PlayerBadge user={user} onClick={handleSignOut} />
    </div>
  );
}
