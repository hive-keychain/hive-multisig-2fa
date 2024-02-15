import { DatabaseModule } from "../database/database.module";
import { AccountConfiguration } from "../database/entities/account-configuration.entity";

const getRepo = () => {
  return DatabaseModule.getDatabase().getRepository(AccountConfiguration);
};

const create = async (config: Partial<AccountConfiguration>) => {
  await getRepo().save(config);
};

const update = async () => {};

export const AccountConfigurationRepository = { create, update };
