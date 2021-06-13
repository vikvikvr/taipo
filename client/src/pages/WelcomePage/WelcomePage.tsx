import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { useSubject } from 'hooks/useSubject';
import { user$ } from 'services/authService';
import './WelcomePage.scss';
import { useAnimation } from './WelcomePage.gsap';
import { fadeInSound, fadeOutSound } from 'services/audioService';

// appers after the player signs in succesfully

export function WelcomePage() {
  useAnimation();
  const [user] = useSubject(user$);
  const history = useHistory();
  useEffect(redirect, [history, user]);

  function redirect() {
    setTimeout(() => {
      fadeOutSound('loading');
      fadeInSound('background', 0, false);
      history.replace('/game/new');
    }, 4_000);
  }

  if (!user) {
    return null;
  }

  return (
    <div className="welcome-page">
      <h1 className="page-title">Welcome</h1>
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
