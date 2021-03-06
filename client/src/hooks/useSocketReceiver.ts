import { playSound } from 'services/audioService';
import { useSocketListener } from 'hooks/useSocketListener';
import { useSubject } from 'hooks/useSubject';
import { useHistory } from 'react-router';
import { game$, roomId$, blocked$ } from 'services/gameService';
import { socket } from 'services/socketService';
import { GameState } from '../../../server/types/types';

// it's a collection of useSocketListener hooks
// they interact with game, roomId, blocked subjects
// it also has access to history for redirects

export function useSocketReceiver() {
  const [blocked, setBlocked] = useSubject(blocked$);
  const history = useHistory();
  // server events handlers
  useSocketListener('startingSoon', onStartingSoon);
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
    history.replace('/game/play');
  }

  function onGameOver() {
    if (history.location.pathname === '/game/play') {
      history.replace('/game/over');
    }
  }

  function onCorrectKey() {
    playSound('correctKey');
  }

  function onJoinedRoom(roomId: string) {
    setTimeout(() => roomId$.next(roomId), 500);
    history.replace('/wait/friend');
  }

  function onWrongKey(socketId: string) {
    if (socketId === socket.id) {
      playSound('wrongKey');
      setBlocked({ ...blocked, myself: true });
    } else {
      setBlocked({ ...blocked, opponent: true });
    }
  }

  function onCanContinue(socketId: string) {
    if (socketId === socket.id) {
      setBlocked({ ...blocked, myself: false });
    } else {
      setBlocked({ ...blocked, opponent: false });
    }
  }
}
