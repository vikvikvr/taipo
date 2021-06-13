import React from 'react';
import './GameModes.scss';
import { useHistory } from 'react-router-dom';
import { emitPlayAlone } from 'services/socketService';
import { SlidingButton } from '../../../components/SlidingButton/SlidingButton';
import { AloneIcon, FriendIcon, StrangerIcon, LockedIcon } from 'assets/icons';
import { useAnimation } from './GameModes.gsap';

interface Props {
  isLoggedIn: boolean;
}

export function GameModes({ isLoggedIn }: Props) {
  const history = useHistory<any>();
  useAnimation();

  function playWithStranger() {
    if (isLoggedIn) {
      history.replace('/wait/random');
    } else {
      history.replace('/login');
    }
  }

  function startGameFriend() {
    if (isLoggedIn) {
      history.replace('/game/invite');
    } else {
      history.replace('/login');
    }
  }

  return (
    <div className="game-modes">
      <h2 className="primary-action">Pick one mode</h2>
      <SlidingButton
        text="Alone"
        onClick={emitPlayAlone}
        Icon={AloneIcon}
        variant="normal"
      />
      <SlidingButton
        text={isLoggedIn ? 'Stranger' : 'Sign In'}
        onClick={playWithStranger}
        Icon={isLoggedIn ? StrangerIcon : LockedIcon}
        variant={isLoggedIn ? 'normal' : 'parallax'}
        backgroundColor={isLoggedIn ? '' : '#f44336'}
      />
      {isLoggedIn && (
        <SlidingButton
          text={isLoggedIn ? 'Friend' : 'Sign In'}
          onClick={startGameFriend}
          Icon={isLoggedIn ? FriendIcon : LockedIcon}
          variant={isLoggedIn ? 'normal' : 'parallax'}
          backgroundColor={isLoggedIn ? '' : '#f44336'}
        />
      )}
    </div>
  );
}
