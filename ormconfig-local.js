module.exports = {
  name: 'default',
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: ['./src/infra/db/mysql/migrations/*.{js,ts}'],
  entities: ['./src/infra/db/mysql/entities/*.{js,ts}'],
  cli: {
    migrationsDir: './src/infra/db/mysql/migrations'
  },
  synchronize: true
}
