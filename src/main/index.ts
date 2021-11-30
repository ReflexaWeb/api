import 'reflect-metadata'
import './config/module-alias'

import { app } from '@/main/config/app'

import { createConnection } from 'typeorm'

createConnection()
  .then(() => app.listen(3333, () => console.log('Server running at http://localhost:3333')))
  .catch(console.error)
