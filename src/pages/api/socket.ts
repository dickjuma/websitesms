import type { NextApiRequest } from "next";
import { Server as SocketIOServer } from "socket.io";

import {
  type NextApiResponseServerIO,
  SOCKET_PATH,
  registerSocketHandlers,
  setSocketServer,
} from "@/lib/socket/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  _request: NextApiRequest,
  response: NextApiResponseServerIO,
) {
  if (!response.socket.server.io) {
    const io = new SocketIOServer(response.socket.server, {
      path: SOCKET_PATH,
      addTrailingSlash: false,
      transports: ["websocket", "polling"],
      serveClient: false,
      connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000,
        skipMiddlewares: true,
      },
      maxHttpBufferSize: 1e6,
      cors: {
        origin: true,
        methods: ["GET", "POST"],
      },
    });

    response.socket.server.io = io;
    setSocketServer(io);
    registerSocketHandlers(io);
  } else {
    setSocketServer(response.socket.server.io);
  }

  response.end();
}
