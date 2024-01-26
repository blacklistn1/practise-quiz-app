import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserInfo1706265161017 implements MigrationInterface {
  name = 'AddUserInfo1706265161017';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`picture\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`nickname\` varchar(50) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`nickname\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`picture\``);
  }
}
