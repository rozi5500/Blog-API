import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRefreshToken1679591995406 implements MigrationInterface {
  name = 'userRefreshToken1679591995406';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refresh_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refresh_token"`);
  }
}
