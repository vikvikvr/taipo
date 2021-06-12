import { useEffect } from 'react';
import { ServerEvent } from '../../../server/types/types';
import { socket } from 'services/socketService';

// custom hook to handle socket events from server
// with the callback provided

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
