import { io } from 'socket.io-client';
import { ClientEvent, PlayerInfo } from '../../../server/types/types';
import { user$ } from './authService';
import { roomId$ } from './gameService';

const serverPort = process.env.REACT_APP_SERVER_PORT;
const serverHost = process.env.REACT_APP_SERVER_HOST;

export const serverUri = `${serverHost}:${serverPort}`;

export const socket = io(serverUri);

function emit(eventName: ClientEvent, ...args: any): void {
  socket.emit(eventName, ...args);
}

// client event emitters

export function emitKeyPressed(letter: string) {
  emit('keyPressed', letter, roomId$.value);
}

export function emitPlayAlone() {
  emit('playAlone', buildPlayerInfo());
}

export function emitCodeRequest() {
  emit('codeRequest', buildPlayerInfo());
}

export function emitJoinRoom() {
  emit('joinRoom', roomId$.value, buildPlayerInfo());
}

export function emitRequestSnapshot() {
  emit('requestSnapshot', roomId$.value);
}

export function emitLeaveRoom() {
  emit('leaveRoom');
}

export function emitEnterLobby() {
  emit('enterLobby', buildPlayerInfo());
}

export function emitLeaveLobby() {
  emit('leaveLobby');
}

function buildPlayerInfo(): PlayerInfo {
  return {
    email: user$.value?.email || '',
    imageUrl: user$.value?.imageUrl || '',
    name: user$.value?.firstName || 'Guest'
  };
}

// might need to handle 'disconnect' event
