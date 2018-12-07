import io from 'socket.io-client';

import { DATA_REQUEST, DATA_RESPONSE, LOGIN } from '../constants/socket-events';
import userStore from '../store/user';

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000');
  }

  return socket;
}

export function onDataRequest(callback) {
  const sock = getSocket();
  sock.on(DATA_REQUEST, callback);
}

export function offDataRequest(callback) {
  const sock = getSocket();
  sock.removeListener(DATA_REQUEST, callback);
}

export function emitDataResponse(response) {
  const sock = getSocket();
  sock.emit(DATA_RESPONSE, {
    my: 'data'
  });
}

export function emitLogin(profile) {
  const sock = getSocket();
  sock.emit(LOGIN, profile);
}

userStore.on('change', emitLogin);
