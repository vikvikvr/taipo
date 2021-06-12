import React, { ChangeEvent } from 'react';
import { NavigationIcon } from 'components/NavigationIcon';
import { SlidingButton } from 'components/SlidingButton';
import { user$ } from 'services/authService';
import { emit } from 'services/socketService';
import { ArrowRightIcon, PaperPlaneIcon, PasteIcon } from 'assets/icons';
import './PlayFriendPage.scss';
import { useSubject } from 'hooks/useSubject';
import { useAnimation } from './PlayFriendPage.gsap';
import { useRedirect } from 'hooks/useRedirect';
import { SlidingInput } from 'components/SlidingInput';
import { roomId$ } from 'services/gameService';

// page that allows the player to get a new code
// or enter an existing one
// in order to play with a friend

export function PlayFriendPage() {
  const [user] = useSubject(user$);
  const [roomId, setRoomId] = useSubject(roomId$);
  useRedirect('/game/new', !user);
  useAnimation();

  function requestCode() {
    if (user) {
      emit('codeRequest', user.email, user.imageUrl);
    }
  }

  function handleClick() {
    if (roomId) {
      submitCode();
    } else {
      getCodeFromClipboard();
    }
  }

  function submitCode() {
    if (user) {
      emit('joinRoom', roomId, user.email, user.imageUrl);
    } else {
      console.warn('Not logged in 🔑');
    }
  }

  function getCodeFromClipboard() {
    navigator.clipboard
      .readText()
      .then((text) => setRoomId(text))
      .catch(() => console.warn('Failed to read clipboard ⚠'));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setRoomId(e.target.value);
  }

  return (
    <div className="play-friend-page">
      <h1>Play together</h1>
      <div className="content">
        <p className="sentence-1">Invite a new friend</p>
        <SlidingButton
          Icon={ArrowRightIcon}
          onClick={requestCode}
          text="Get code"
          variant="parallax"
        />
        <p className="sentence-2">Already got invited?</p>
        <SlidingInput
          InactiveIcon={PasteIcon}
          onClick={handleClick}
          isActive={Boolean(roomId)}
          value={roomId}
          placeholder="Enter code"
          onChange={handleChange}
          ActiveIcon={PaperPlaneIcon}
        />
      </div>
      <NavigationIcon toPath="/game/new" icon="back" />
    </div>
  );
}
