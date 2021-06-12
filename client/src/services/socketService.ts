import { io } from 'socket.io-client';
import { ClientEvent } from '../../../server/types/types';

const serverPort = process.env.REACT_APP_SERVER_PORT;
const serverHost = process.env.REACT_APP_SERVER_HOST;

export const serverUri = `${serverHost}:${serverPort}`;

export const socket = io(serverUri);

export function emit(eventName: ClientEvent, ...args: any): void {
  socket.emit(eventName, ...args);
}

// might need to handle 'disconnect' event
