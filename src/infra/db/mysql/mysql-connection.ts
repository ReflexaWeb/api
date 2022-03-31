import 'dotenv/config'
import { DataSource } from 'typeorm'

const dir = process.env.NODE_ENV === 'dev' ? 'src' : 'dist'

export const mysqlSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: [`./${dir}/infra/db/mysql/typeorm/migrations/*.{js,ts}`],
  entities: [`./${dir}/infra/db/mysql/typeorm/entities/*.{js,ts}`],
  synchronize: true
})
