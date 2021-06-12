import { useSubject } from 'hooks/useSubject';
import { blocked$, distinguishPlayers } from 'services/gameService';
import { socket } from 'services/socketService';
import { GameState } from '../../../server/types/types';

// custom hook to give all props needed to
// the <PlayerPosition> component
// (might need a big refactor, doesn't look too good)

export function usePlayersPosition(game: GameState) {
  const [blocked] = useSubject(blocked$);
  if (!game.players.length) {
    return null;
  }
  const { myself, opponent } = distinguishPlayers(game.players, socket.id);
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
