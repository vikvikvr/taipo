import { useEffect } from 'react';
import { emit, socket } from 'services/socketService';

// custom hook to emit 'keyPressed' events
// to the server via socket
// when the player types on the keyboard

export function useKeyboard(roomId: string, email?: string): void {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const letter = e.key.toLowerCase();
      emit('keyPressed', email || socket.id, letter, roomId);
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [email, roomId]);
}
