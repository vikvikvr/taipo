import { useEffect } from 'react';
import { ServerEvent } from '../../../server/types/types';
import { socket } from 'services/socketService';

// handles socket events from server with a callback

export function useSocketListener(
  event: ServerEvent,
  callback: (...args: any) => void
): void {
  useEffect(() => {
    socket.on(event, callback);
    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);
}
