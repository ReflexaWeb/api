import 'dotenv/config'

export const dir = process.env.NODE_ENV === 'dev' ? 'src' : 'dist'

export const env = {
  pg: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB
  }
}
