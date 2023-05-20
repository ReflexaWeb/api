import { env, dir } from '../../../main/config/env'

import { DataSource } from 'typeorm'

export const pgSource = new DataSource({
  type: 'postgres',
  host: env.pg.host,
  port: Number(env.pg.port),
  username: env.pg.user,
  password: env.pg.password,
  database: env.pg.database,
  migrations: [`./${dir}/infra/db/postgres/typeorm/migrations/*.{js,ts}`],
  entities: [`./${dir}/infra/db/postgres/typeorm/entities/*.{js,ts}`],
  synchronize: false
})
