import { DatabaseModule } from "../database/database.module";
import { AccountConfiguration } from "../database/entities/account-configuration.entity";

const getRepo = () => {
  return DatabaseModule.getDatabase().getRepository(AccountConfiguration);
};

const create = async (config: Partial<AccountConfiguration>) => {
  await getRepo().save(config);
};

const set2FAId = async (username: string, twoFaId: string) => {
  await getRepo().save({
    username: username,
    twoFAId: twoFaId,
    use2FAByDefault: true,
  });
};

const update = async () => {};

export const AccountConfigurationRepository = { create, update, set2FAId };
