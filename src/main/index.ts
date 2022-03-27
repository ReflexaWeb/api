import 'dotenv/config'
import 'reflect-metadata'
import './config/module-alias'

import { app } from '@/main/config/app'
import { mysqlSource } from '@/infra/db/mysql/mysql-connection'

mysqlSource.initialize()
  .then(() => app.listen(3333, () => console.log('Server running at http://localhost:3333')))
  .catch(console.error)
