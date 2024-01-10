import Logger from "hive-keychain-commons/lib/logger/logger";
import { Socket, io } from "socket.io-client";
import { Config } from "./config";
import {
  SignerConnectMessage,
  SocketMessageCommand,
} from "./socket-message.interface";
import { HiveUtils } from "./utils/hive.utils";

let socket: Socket;

const init = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Logger.technical(`Initializing socket.io on ${Config.multisigServer}`);

    socket = io(Config.multisigServer, {});

    socket.on("connect", () => {
      console.log("connected");
      resolve(connectMultisigAccount());
    });
    socket.on("error", (err) => {
      Logger.error("Error in socket", err);
    });
    socket.on("disconnect", (ev) => {
      Logger.info("Disconnected from socket");
    });
  });
};

const connectMultisigAccount = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Logger.info(
      `Trying to connect @${Config.bot.account} to the multisig backend server`
    );

    const signerConnectMessages: SignerConnectMessage[] = [];
    if (Config.bot.activeKey && Config.bot.activePubKey) {
      const message = HiveUtils.signMessage(
        Config.bot.account,
        Config.bot.activeKey
      );
      signerConnectMessages.push({
        username: Config.bot.account,
        publicKey: Config.bot.activePubKey,
        message: message,
      });
    }
    if (Config.bot.postingKey && Config.bot.postingPubKey) {
      const message = HiveUtils.signMessage(
        Config.bot.account,
        Config.bot.postingKey
      );
      signerConnectMessages.push({
        username: Config.bot.account,
        publicKey: Config.bot.postingPubKey,
        message: message,
      });
    }
    socket.emit(
      SocketMessageCommand.SIGNER_CONNECT,
      signerConnectMessages,
      (signerConnectResponse: any) => {
        console.log(signerConnectResponse);
        for (const signer of signerConnectMessages) {
          if (
            !(
              signerConnectResponse.errors &&
              Object.keys(signerConnectResponse.errors).includes(
                signer.publicKey
              )
            )
          ) {
            //TODO process pending transactions
            resolve(true);
          } else {
            reject(false);
          }
        }
      }
    );
  });
};

export const SocketIoLogic = { init };
