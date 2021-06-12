import { io } from 'socket.io-client';
import { ClientEvent, PlayerInfo } from '../../../server/types/types';

const serverPort = process.env.REACT_APP_SERVER_PORT;
const serverHost = process.env.REACT_APP_SERVER_HOST;

export const serverUri = `${serverHost}:${serverPort}`;

export const socket = io(serverUri);

function emit(eventName: ClientEvent, ...args: any): void {
  socket.emit(eventName, ...args);
}

// client event emitters

export function emitKeyPressed(letter: string, roomId: string) {
  emit('keyPressed', letter, roomId);
}

export function emitPlayAlone(playerInfo: PlayerInfo) {
  emit('playAlone', playerInfo);
}

export function emitCodeRequest(playerInfo: PlayerInfo) {
  emit('codeRequest', playerInfo);
}

export function emitJoinRoom(roomId: string, playerInfo: PlayerInfo) {
  emit('joinRoom', roomId, playerInfo);
}

export function emitRequestSnapshot(roomId: string) {
  emit('requestSnapshot', roomId);
}

export function emitLeaveRoom() {
  emit('leaveRoom');
}

export function emitEnterLobby(playerInfo: PlayerInfo) {
  emit('enterLobby', playerInfo);
}

export function emitLeaveLobby() {
  emit('leaveLobby');
}

// might need to handle 'disconnect' event
