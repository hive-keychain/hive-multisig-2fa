import { Express } from "express";
import { BotConfigurationLogic } from "./bot-configuration.logic";

const setupGetByAccountName = (app: Express) => {
  app.get(`/account-configuration/:username`, async (req, res) => {
    try {
      res
        .status(200)
        .send(
          await BotConfigurationLogic.getConfiguration(req.params.username)
        );
    } catch (e) {
      res.status(404).send("Error");
    }
  });
};

const setupHealthCheck = (app: Express) => {
  app.get(`/health`, async (req, res) => {
    res.sendStatus(200);
  });
};

const setupApis = (app: Express) => {
  setupGetByAccountName(app);
  setupHealthCheck(app);
};

export const AccountConfigurationApi = { setupApis };
