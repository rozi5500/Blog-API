import { MigrationInterface, QueryRunner } from 'typeorm';

export class userAuthTokenField1680891347157 implements MigrationInterface {
  name = 'userAuthTokenField1680891347157';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "authToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "authToken"`);
  }
}
