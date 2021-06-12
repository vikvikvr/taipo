import {
  background,
  correctKey,
  gameOver,
  wrongKey
} from 'services/audioService';
import { useSocketListener } from 'hooks/useSocketListener';
import { useSubject } from 'hooks/useSubject';
import { useHistory } from 'react-router';
import { user$ } from 'services/authService';
import { game$, roomId$, blocked$ } from 'services/gameService';
import { socket } from 'services/socketService';
import { GameState } from '../../../server/types/types';

// it's a collection of useSocketListener hooks
// they interact with game, roomId, blocked subjects
// it also has access to history for redirects

export function useSocketReceiver() {
  const [user] = useSubject(user$);
  const [blocked, setBlocked] = useSubject(blocked$);
  const history = useHistory();
  // server events handlers
  useSocketListener('startingSoon', onStartingSoon);
  useSocketListener('playerLeft', onPlayerLeft);
  useSocketListener('gameOver', onGameOver);
  useSocketListener('correctKey', onCorrectKey);
  useSocketListener('joinedRoom', onJoinedRoom);
  useSocketListener('gameSnapshot', onGameSnapshot);
  useSocketListener('wrongKey', onWrongKey);
  useSocketListener('canContinue', onCanContinue);

  function onGameSnapshot(game: GameState) {
    game$.next(game);
  }

  function onStartingSoon(roomId: string) {
    roomId$.next(roomId);
    history.push('/game/play');
  }

  function onPlayerLeft() {
    history.push('/game/over');
  }

  function onGameOver() {
    if (history.location.pathname === '/game/play') {
      gameOver.play();
      background.play();
      history.push('/game/over');
    }
  }

  function onCorrectKey() {
    correctKey.play();
  }

  function onJoinedRoom(roomId: string) {
    setTimeout(() => roomId$.next(roomId), 500);
    history.push('/wait/friend');
  }

  function onWrongKey(playerId: string) {
    const username = user?.email || socket.id;
    if (!username) {
      return;
    }
    if (playerId === username) {
      wrongKey.play();
      setBlocked({ ...blocked, myself: true });
    } else {
      setBlocked({ ...blocked, opponent: true });
    }
  }

  function onCanContinue(playerId: string) {
    const username = user?.email || socket.id;

    if (!username) {
      return;
    }
    if (playerId === username) {
      setBlocked({ ...blocked, myself: false });
    } else {
      setBlocked({ ...blocked, opponent: false });
    }
  }
}
