import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { NavigationIcon } from 'components/NavigationIcon';
import { useSubject } from 'hooks/useSubject';
import { user$ } from 'services/authService';
import { emit } from 'services/socketService';
import './WaitRandomPage.scss';
import { useAnimation } from './WaitRandomPage.gsap';
import { loading } from 'services/audioService';

// appers after the player enters the lobby
// will redirect to game screen after an opponent is found

export function WaitRandomPage() {
  const [user] = useSubject(user$);
  const history = useHistory();
  useEffect(enterLobby, [user, history]);
  useAnimation();
  useEffect(startLoadingSound, []);

  function startLoadingSound() {
    setTimeout(() => loading.play(), 1000);
  }

  function enterLobby() {
    if (user) {
      setTimeout(() => {
        emit('enterLobby', user.email, user.imageUrl);
      }, 500);
    } else {
      history.replace('/game/new');
    }
  }

  function leaveLobby() {
    if (user) {
      emit('leaveLobby', user.email);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="wait-random-page">
      <h1>Get ready</h1>
      <div className="content">
        <h3 className="hello">Hello, {user.firstName}</h3>
        <img
          alt="user face"
          src={user.imageUrl}
          className="user-picture"
          draggable={false}
        />
        <p className="message">Looking for a random opponent</p>
        <LoadingSpinner />
      </div>
      <NavigationIcon toPath="/game/new" onClick={leaveLobby} icon="exit" />
    </div>
  );
}
