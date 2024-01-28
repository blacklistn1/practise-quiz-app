import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1706438883664 implements MigrationInterface {
  name = 'Init1706438883664';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(100) NOT NULL, \`password\` varchar(60) NOT NULL, \`first_name\` varchar(80) NULL, \`last_name\` varchar(200) NULL, \`picture\` varchar(255) NULL, \`nickname\` varchar(50) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
