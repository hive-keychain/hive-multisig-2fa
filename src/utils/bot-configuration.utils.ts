import { PrivateKey } from "@hiveio/dhive";
import Logger from "hive-keychain-commons/lib/logger/logger";
import { HiveUtils } from "./hive.utils";

const initConfigIfNecessary = async () => {
  const extendedAccount = (
    await HiveUtils.getClient().database.getAccounts([
      process.env.BOT_ACCOUNT_NAME!,
    ])
  )[0];

  const jsonMetadata = JSON.parse(extendedAccount.json_metadata);
  console.log(
    !jsonMetadata.isMultisigBot ||
      !jsonMetadata.configPath ||
      jsonMetadata.configPath !== process.env.CONFIG_PATH,
    !jsonMetadata.isMultisigBot,
    !jsonMetadata.configPath,
    jsonMetadata.configPath !== process.env.CONFIG_PATH
  );
  if (
    !jsonMetadata.isMultisigBot ||
    !jsonMetadata.configPath ||
    jsonMetadata.configPath !== process.env.CONFIG_PATH
  ) {
    Logger.info("Setting up configuration");
    await HiveUtils.getClient().broadcast.sendOperations(
      [
        [
          "account_update2",
          {
            account: process.env.BOT_ACCOUNT_NAME,
            json_metadata: JSON.stringify({
              isMultisigBot: true,
              configPath: process.env.CONFIG_PATH,
            }),
            posting_json_metadata: "",
          },
        ],
      ],
      PrivateKey.fromString(process.env.BOT_ACTIVE_KEY!.toString())
    );
  }

  console.log(extendedAccount.json_metadata);
};

export const BotConfigurationUtils = { initConfigIfNecessary };
