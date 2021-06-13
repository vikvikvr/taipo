import React, { useState } from 'react';
import './WaitFriendPage.scss';
import { CheckIcon, CopyIcon } from 'assets/icons';
// hooks
import { useRedirect } from 'hooks/useRedirect';
import { useSubject } from 'hooks/useSubject';
import { useAnimation } from './WaitFriendPage.gsap';
// services
import { user$ } from 'services/authService';
import { roomId$ } from 'services/gameService';
import { emitLeaveRoom } from 'services/socketService';
import { playSound } from 'services/audioService';
// components
import { LoadingSpinner } from 'components/LoadingSpinner';
import { NavigationIcon } from 'components/NavigationIcon';
import { SlidingInput } from 'components/SlidingInput';

// appers after the player requests a code
// when a friend enters the same code,
// will redirect to game screen

export function WaitFriendPage() {
  useAnimation();
  const [roomId, setRoomId] = useSubject(roomId$);
  const [copied, setCopied] = useState(false);
  const [user] = useSubject(user$);
  useRedirect('/game/new', !user);

  function stopWaiting() {
    setRoomId('');
    emitLeaveRoom();
  }

  function copyCodeToClipboard() {
    setCopied(true);
    playSound('valid');
    navigator.clipboard.writeText(roomId);
  }

  return (
    <div className="wait-friend-page">
      <h1 className="page-title">Invite</h1>
      <div className="content">
        <h2 className="subtitle">Share this code</h2>
        <SlidingInput
          id="this one"
          ActiveIcon={CheckIcon}
          InactiveIcon={CopyIcon}
          onClick={copyCodeToClipboard}
          value={roomId}
          isActive={copied}
        />
        <h3 className="reason">So that your friend can join you</h3>
        <LoadingSpinner />
      </div>
      <NavigationIcon onClick={stopWaiting} toPath="/game/invite" icon="exit" />
    </div>
  );
}
