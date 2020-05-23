import socketIo from 'socket.io';

import {
  CONNECTION,
  CONNECTED,
} from '../events';

export default (server) => {
  const io = socketIo(server);
  io.on(CONNECTION, (socket) => {
    socket.emit(CONNECTED);
  });

  return io;
};
