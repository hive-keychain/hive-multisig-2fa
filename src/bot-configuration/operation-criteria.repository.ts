import { DatabaseModule } from "../database/database.module";
import { OperationCriteria } from "../database/entities/operation-criteria.entity";

const getRepo = () => {
  return DatabaseModule.getDatabase().getRepository(OperationCriteria);
};

const update = async () => {};

export const OperationCriteriaRepository = {};
