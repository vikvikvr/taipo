import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { NavigationIcon } from 'components/NavigationIcon';
import { useSubject } from 'hooks/useSubject';
import { user$ } from 'services/authService';
import { emitEnterLobby, emitLeaveLobby } from 'services/socketService';
import './WaitRandomPage.scss';
import { useAnimation } from './WaitRandomPage.gsap';
import { useRedirect } from 'hooks/useRedirect';

// appers after the player enters the lobby
// will redirect to game screen after an opponent is found

export function WaitRandomPage() {
  const [user] = useSubject(user$);
  const history = useHistory();
  useRedirect('/game/new', !user);
  useAnimation(!!user);
  useEffect(enterLobby, [user, history]);

  function enterLobby() {
    const id = setTimeout(emitEnterLobby, 1_500);
    return () => {
      clearTimeout(id);
    };
  }

  return (
    <div className="wait-random-page">
      <h1 className="page-title">Get ready</h1>
      <div className="content">
        <h2 className="hello">Wait, {user?.firstName}</h2>
        <img
          alt="user face"
          src={user?.imageUrl}
          className="user-picture"
          draggable={false}
        />
        <h3 className="message">Looking for a random opponent</h3>
        <LoadingSpinner />
      </div>
      <NavigationIcon toPath="/game/new" onClick={emitLeaveLobby} icon="exit" />
    </div>
  );
}
