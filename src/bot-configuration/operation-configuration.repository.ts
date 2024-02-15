import { DatabaseModule } from "../database/database.module";
import { OperationConfiguration } from "../database/entities/operation-configuration.entity";

const getRepo = () => {
  return DatabaseModule.getDatabase().getRepository(OperationConfiguration);
};

const update = async () => {};

export const OperationConfigurationRepository = {};
