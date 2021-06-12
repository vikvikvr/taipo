import React, { useCallback } from 'react';
import './LoginPage.scss';
import { useAuthentication } from 'hooks/useAuthentication';
import { useHistory } from 'react-router-dom';
import { GitHubIcon, GoogleIcon, FacebookIcon } from 'assets/icons';
import { NavigationIcon } from 'components/NavigationIcon';
import { SlidingButton } from 'components/SlidingButton';
import { useAnimation } from './LoginPage.gsap';

// page that allows a player to sign in with 3 strategies
// google - facebook - github

export function LoginPage() {
  useAnimation();
  const history = useHistory();
  // not sure if useCallback is really necessary
  const onSignIn = useCallback(afterLoginActions, [history]);
  const { signIn } = useAuthentication(onSignIn);

  function afterLoginActions() {
    history.replace('/welcome');
  }

  return (
    <div className="login-page">
      <h1 className="page-title">Login</h1>
      <div className="content">
        <h2 className="heading">Make your choice</h2>
        <SlidingButton
          Icon={GoogleIcon}
          onClick={() => signIn('google')}
          variant="parallax"
          text="Google"
          backgroundColor="#d84d32"
        />
        <SlidingButton
          Icon={FacebookIcon}
          onClick={() => signIn('facebook')}
          variant="parallax"
          text="Facebook"
          backgroundColor="#3363d5"
        />
        <SlidingButton
          Icon={GitHubIcon}
          onClick={() => signIn('github')}
          variant="parallax"
          text="GitHub"
          backgroundColor="#2a2a2a"
        />
      </div>
      <NavigationIcon toPath="/game/new" icon="back" />
    </div>
  );
}
