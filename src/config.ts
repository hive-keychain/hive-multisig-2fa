import path from "path";

require("dotenv").config();

export const Config = {
  port: {
    server: process.env.PORT || 5001,
    socketIo: process.env.SOCKET_PORT || 5001,
  },
  logger: {
    folder: path.join(__dirname, "..", "logs"),
    file: "multisig-bot-%DATE%.log",
    levels: {
      TECHNICAL: 1,
      INFO: 1,
      ERROR: 0,
      OPERATION: 1,
      DEBUG: 1,
      WARN: 1,
    },
  },
  parser: {
    infoFilePath: process.env.INFO_FILE_PATH,
    defaultBlock: process.env.DEFAULT_BLOCK ?? 81778148,
  },
  bot: {
    account: process.env.BOT_ACCOUNT_NAME,
  },
};
