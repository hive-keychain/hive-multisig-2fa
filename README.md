# Hive Multisig Bot

This bot will allow multisig accounts to sign transactions automatically when conditions are respected:

- Add granularity to keys by only allowing a certain type of transactions to be signed

- Add 2FA

- Onboarding tickets

The goal is for anyone to be able to run its own bot or use the one provided by the Hive Multisig team.

More information on the project can be found in our [proposal](https://peakd.com/hive-139531/@stoodkev/hive-multisig-continuation-proposal)

## How to install

### MariaDB

Setup locally your MariaDB. (https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb/).
Setup your local database.
Import the database init script into your local database. You can find this file at `src/database/hive_multisig_bot.sql`.

### Local environment

Use the example.env to create your own env file.
