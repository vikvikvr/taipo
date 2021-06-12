import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { useSubject } from 'hooks/useSubject';
import { user$ } from 'services/authService';
import './WelcomePage.scss';
import { useAnimation } from './WelcomePage.gsap';
import { loading, valid } from 'services/audioService';

// appers after the player signs in succesfully

export function WelcomePage() {
  const [user] = useSubject(user$);
  const history = useHistory();
  useEffect(redirect, [history, user]);
  useEffect(playSounds, []);
  useAnimation();

  function playSounds() {
    setTimeout(() => valid.play(), 500);
    setTimeout(() => loading.play(), 2000);
  }

  function redirect() {
    const delay = user ? 4_000 : 0;
    setTimeout(() => {
      loading.stop();
      history.replace('/game/new');
    }, delay);
  }

  if (!user) {
    return null;
  }

  return (
    <div className="welcome-page">
      <h1>Welcome</h1>
      <div className="content">
        <h2 className="hello">Hello, {user.firstName}!</h2>
        <img
          className="badge"
          alt="profile pic"
          src={user.imageUrl}
          draggable={false}
        />
        <h3 className="question">Ready to type?</h3>
        <LoadingSpinner />
      </div>
    </div>
  );
}
