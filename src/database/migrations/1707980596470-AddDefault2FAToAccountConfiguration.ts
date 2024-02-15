import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDefault2FAToAccountConfiguration1707980596470
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "account-configuration",
      new TableColumn({
        name: "use2FAByDefault",
        type: "boolean",
        default: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
