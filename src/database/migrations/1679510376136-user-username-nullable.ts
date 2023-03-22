import { MigrationInterface, QueryRunner } from 'typeorm';

export class userUsernameNullable1679510376136 implements MigrationInterface {
  name = 'userUsernameNullable1679510376136';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "userName" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "userName" SET NOT NULL`,
    );
  }
}
