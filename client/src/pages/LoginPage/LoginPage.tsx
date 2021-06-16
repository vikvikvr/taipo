import React from 'react';
import { useHistory } from 'react-router-dom';
import { GitHubIcon, GoogleIcon, FacebookIcon } from 'assets/icons';
import { NavigationIcon } from 'components/NavigationIcon';
import { SlidingButton } from 'components/SlidingButton';
import { signIn, SignInStrategy } from 'services/authService';
import { useAnimation } from './LoginPage.gsap';
import './LoginPage.scss';
import { debug } from 'app/App';

// page that allows a player to sign in with 3 strategies
// google - facebook - github

export function LoginPage() {
  useAnimation();
  const history = useHistory();

  async function handleSignIn(strategy: SignInStrategy) {
    try {
      await signIn(strategy);
      history.replace('/welcome');
    } catch (error) {
      debug && console.log('failed to sign in with', strategy, error);
    }
  }

  return (
    <div className="login-page">
      <h1 className="page-title">Sign in</h1>
      <div className="content">
        <h2 className="heading">Make your choice</h2>
        <SlidingButton
          Icon={GoogleIcon}
          onClick={() => handleSignIn('google')}
          variant="parallax"
          text="Google"
          backgroundColor="#d84d32"
        />
        <SlidingButton
          Icon={FacebookIcon}
          onClick={() => handleSignIn('facebook')}
          variant="parallax"
          text="Facebook"
          backgroundColor="#3363d5"
        />
        <SlidingButton
          Icon={GitHubIcon}
          onClick={() => handleSignIn('github')}
          variant="parallax"
          text="GitHub"
          backgroundColor="#2a2a2a"
        />
      </div>
      <NavigationIcon toPath="/game/new" icon="back" />
    </div>
  );
}
