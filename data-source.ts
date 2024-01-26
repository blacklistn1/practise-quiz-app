import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_LOCAL_HOST,
  port: +process.env.DB_LOCAL_PORT,
  username: process.env.DB_LOCAL_USERNAME,
  password: process.env.DB_LOCAL_PASSWORD,
  database: process.env.DB_LOCAL_DATABASE,
  synchronize: false,
  entities: ['./src/app/**/*.entity.ts'],
  migrations: ['./src/project/db/migrations/*.ts'],
});
