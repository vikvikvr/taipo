import { useSubject } from 'hooks/useSubject';
import { user$ } from 'services/authService';
import { blocked$, distinguishPlayers } from 'services/gameService';
import { socket } from 'services/socketService';
import { GameState } from '../../../server/types/types';

// custom hook to give all props needed to
// the <PlayerPosition> component
// (might need a big refactor, doesn't look too good)

export function usePlayersPosition(game: GameState) {
  const [user] = useSubject(user$);
  const [blocked] = useSubject(blocked$);
  const username = user?.email || socket.id;
  if (!game.players.length) {
    return null;
  }
  const { myself, opponent } = distinguishPlayers(game.players, username);
  if (!opponent) {
    return null;
  }
  const maxDistance = 5;

  const me = {
    imageUrl: myself.imageUrl,
    position: Math.min(maxDistance, myself.letterIndex - opponent.letterIndex),
    isBlocked: blocked.myself
  };

  const other = {
    imageUrl: opponent.imageUrl,
    position: Math.max(-maxDistance, opponent.letterIndex - myself.letterIndex),
    isBlocked: blocked.opponent
  };

  return { me, other };
}
