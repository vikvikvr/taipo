import './PlayGamePage.scss';
import { useHistory } from 'react-router';
import React, { useEffect } from 'react';
// hooks
import { useSubject } from 'hooks/useSubject';
import { useKeyboard } from 'hooks/useKeyboard';
import { usePlayersPosition } from 'hooks/usePlayersPosition';
import { useRedirect } from 'hooks/useRedirect';
import { user$ } from 'services/authService';
import {
  emitRequestSnapshot,
  emitLeaveRoom,
  socket
} from 'services/socketService';
import { blocked$, game$, roomId$ } from 'services/gameService';
import { SentenceRow } from './SentenceRow';
import { Countdown } from './Countdown';
import { LettersScatter } from './LettersScatter';
import { VersusHeader } from './VersusHeader';
import { BlockedOverlay } from './BlockedOverlay';
import { PlayerPosition } from './PlayerPosition';
import { playSound } from 'services/audioService';

// I personally feel like this components calls for a refactor
// have tried several times breaking it down
// but ended up breaking the code instead 😜

export function PlayGamePage() {
  // behaviour subjects
  const [user] = useSubject(user$);
  const [game] = useSubject(game$);
  const [roomId] = useSubject(roomId$);
  const [blocked] = useSubject(blocked$);
  // other hooks
  const history = useHistory();
  useEffect(emitRequestSnapshot, []);
  useKeyboard(roomId, user?.email);
  useRedirect('/game/new', !roomId);
  const positions = usePlayersPosition(game);

  function leaveGame() {
    playSound('mouseClick');
    emitLeaveRoom();
    history.replace('/game/over');
  }

  if (!game.started) {
    return (
      <div className="play-game-page">
        <Countdown startTime={game.startedAt} />
      </div>
    );
  }

  const opponent = game.players.find((p) => p.socketId !== socket.id);
  const myself = game.players.find((p) => p.socketId === socket.id);

  if (!myself) {
    return <></>;
  }

  const currentWord = game.sentence;
  const leftWord = currentWord.substr(0, myself.letterIndex) || '';
  const leftName = game.players[0].name;
  const rightName = game.players[1]?.name;
  const isGuest = !user;

  return (
    <div className="play-game-page">
      <VersusHeader
        isGuest={isGuest}
        leftName={leftName}
        rightName={rightName}
        onClick={leaveGame}
      />
      <BlockedOverlay isActive={blocked.myself} />
      <LettersScatter letters={leftWord} />
      <div className="game-content">
        {opponent && positions && <PlayerPosition {...positions.other} />}
        <SentenceRow
          letterIndex={myself.letterIndex}
          word={currentWord}
          typos={game.typos}
          isBlocked={blocked.myself}
        />
        {opponent && positions && <PlayerPosition {...positions.me} />}
      </div>
    </div>
  );
}
