import React from 'react';
import './GameModes.scss';
import { useHistory } from 'react-router-dom';
import { emitPlayAlone } from 'services/socketService';
import { user$ } from 'services/authService';
import { SlidingButton } from '../../../components/SlidingButton/SlidingButton';
import { AloneIcon, FriendIcon, StrangerIcon, LockedIcon } from 'assets/icons';
import { useAnimation } from './GameModes.gsap';
import { PlayerInfo } from '../../../../../server/types/types';

interface Props {
  isLoggedIn: boolean;
}

export function GameModes({ isLoggedIn }: Props) {
  const history = useHistory<any>();
  useAnimation();

  function startGameAlone() {
    const playerInfo: PlayerInfo = {
      email: user$.value?.email || '',
      imageUrl: user$.value?.imageUrl || '',
      name: user$.value?.firstName || 'Guest'
    };
    emitPlayAlone(playerInfo);
  }

  function playWithStranger() {
    if (isLoggedIn) {
      history.push('/wait/random');
    } else {
      history.push('/login');
    }
  }

  function startGameFriend() {
    if (isLoggedIn) {
      history.push('/game/invite');
    } else {
      history.push('/login');
    }
  }

  return (
    <div className="game-modes">
      <p className="question">Who do you want to play with?</p>
      <SlidingButton
        text="Alone"
        onClick={startGameAlone}
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
