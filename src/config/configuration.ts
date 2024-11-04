import * as process from 'node:process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  api: {
    moralis: process.env.MORALIS_KEY,
    quicknode: process.env.QUICKNODE_KEY,
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
  destinationType: process.env.DESTINATION_TYPE,
});
