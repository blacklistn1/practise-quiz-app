export default () => ({
  database: {
    host: process.env.DB_LOCAL_HOST,
    port: process.env.DB_LOCAL_PORT,
    username: process.env.DB_LOCAL_USERNAME,
    password: process.env.DB_LOCAL_PASSWORD,
    database: process.env.DB_LOCAL_DATABASE,
    synchronize: false,
    entities: ['./app/**/*.entity.js'],
    autoLoadEntities: true,
  },
});
