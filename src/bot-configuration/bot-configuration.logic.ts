import { AccountConfiguration } from "../database/entities/account-configuration.entity";
import { AccountConfigurationRepository } from "./account-configuration.repository";

const createConfig = async (
  username: string,
  defaultConfig: Partial<AccountConfiguration>
) => {
  await AccountConfigurationRepository.create({
    username: defaultConfig.username,
  });
};

export const BotConfigurationLogic = { createConfig };
