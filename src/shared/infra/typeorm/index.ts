import { createConnections } from 'typeorm';

createConnections([
  {
    name: 'default',
    type: 'postgres',
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    schema: process.env.PG_SCHEMA,
    database: process.env.PG_DATABASE,
    entities: [`${process.env.PG_PATH_ENTITIES}`],
  },
]);
