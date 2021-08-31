import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const pgConfig: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  schema: process.env.PG_SCHEMA,
  database: process.env.PG_DATABASE,
  synchronize: true,
  migrationsTableName: "migration_table",
  entities: [
    "./src/modules/**/infra/postgres/models/*{.ts,.js}"
  ],
  migrations: ['./src/shared/infra/typeorm/migrations/**'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};

createConnection(pgConfig).then(async connection => {
}).catch(error => console.log("error: " + error));

 export = pgConfig;