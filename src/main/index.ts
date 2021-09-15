import './config/module-alias'

import 'reflect-metadata'
import { app } from '@/main/config/app'

import { createConnection } from 'typeorm'

createConnection()
  .then(() => app.listen(3000, () => console.log('Server running at http://localhost:3000')))
  .catch(console.error)
