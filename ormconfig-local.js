module.exports = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['./src/infra/db/mysql/entities/*.ts'],
  cli: {
    migrationsDir: './src/infra/db/mysql/migrations/*.ts'
  },
  synchronize: true
}