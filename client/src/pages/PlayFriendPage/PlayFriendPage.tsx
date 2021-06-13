import React, { ChangeEvent } from 'react';
import { NavigationIcon } from 'components/NavigationIcon';
import { SlidingButton } from 'components/SlidingButton';
import { user$ } from 'services/authService';
import { emitCodeRequest, emitJoinRoom } from 'services/socketService';
import { ArrowRightIcon, PaperPlaneIcon, PasteIcon } from 'assets/icons';
import './PlayFriendPage.scss';
import { useSubject } from 'hooks/useSubject';
import { useAnimation } from './PlayFriendPage.gsap';
import { useRedirect } from 'hooks/useRedirect';
import { SlidingInput } from 'components/SlidingInput';
import { roomId$ } from 'services/gameService';

// page that allows the player to get a new code
// or join an existing room
// in order to play with a friend

export function PlayFriendPage() {
  const [user] = useSubject(user$);
  const [roomId, setRoomId] = useSubject(roomId$);
  useRedirect('/game/new', !user);
  useAnimation();

  function handleClick() {
    if (roomId) {
      emitJoinRoom();
    } else {
      getCodeFromClipboard();
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
      <h1 className="page-title">Play together</h1>
      <div className="content">
        <h2 className="primary-action">Invite a new friend</h2>
        <SlidingButton
          Icon={ArrowRightIcon}
          onClick={emitCodeRequest}
          text="Get code"
          variant="parallax"
        />
        <h3 className="secondary-action">Already got invited?</h3>
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
