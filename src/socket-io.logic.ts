import Logger from "hive-keychain-commons/lib/logger/logger";
import { Socket, io } from "socket.io-client";

let socket: Socket;

const init = async () => {
  Logger.technical("Initializing socket.io");
  socket = io("http://localhost:5000", {});
};

export const SocketIoLogic = { init };
