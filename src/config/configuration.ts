import * as process from 'node:process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  // database: {
  //   host: process.env.DATABASE_HOST,
  //   port: parseInt(process.env.DATABASE_PORT, 10) || 54321,
  //   user: process.env.DATABASE_USER,
  //   name: process.env.DATABASE_NAME,
  //   password: process.env.DATABASE_PASSWORD,
  // },
  api: {
    moralis: process.env.MORALIS_KEY,
  },
  endpoint: process.env.ENDPOINT,
  db: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
    synchronize: true,
  },
});
