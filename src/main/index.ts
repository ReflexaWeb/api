import 'reflect-metadata'
import './config/module-alias'

import { app } from '@/main/config/app'
import { pgSource } from '@/infra/db/postgres/pg-connection'

pgSource.initialize()
  .then(() => app.listen(3333, () => console.log('Server running!')))
  .catch(console.error)
