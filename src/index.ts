import bodyParser from "body-parser";
import express from "express";
import { Express } from "express-serve-static-core";
import Logger from "hive-keychain-commons/lib/logger/logger";
import { createServer } from "http";
import https from "https";
import { BlockParserModule } from "./block-parser/block-parser.module";
import { Config } from "./config";
import { SocketIoLogic } from "./socket-io.logic";
import { DataUtils } from "./utils/data.utils";
require("dotenv").config();

var cors = require("cors");

const initServerRoutine = async () => {
  const app = express();
  Logger.initLogger(Config.logger, process.env.NODE_ENV);
  setupRoutes(app);
  await setupRoutines();
  startServer(app);
};

const setupRoutes = (app: Express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
};

const setupRoutines = async () => {
  Logger.technical("Setting up routines");
  await DataUtils.initStorage();
  await BlockParserModule.initializeValues();
  BlockParserModule.start();
};

const startServer = (app: Express) => {
  if (!process.env.DEV) {
    https.createServer({}, app).listen(Config.port.server, () => {
      Logger.technical(`Https Server running on port ${Config.port.server}`);
    });
  } else {
    const httpServer = createServer(app);
    SocketIoLogic.init();

    httpServer.listen(Config.port.server, () => {
      Logger.technical(
        `Running on port ${Config.port.server}, socket.io on port ${Config.port.socketIo}`
      );
    });
  }
};

initServerRoutine();
