import 'reflect-metadata'
import './config/module-alias'

import { app } from '@/main/config/app'

import { createConnection } from 'typeorm'

// app.listen(3000, () => console.log('Server running at http://localhost:3000'))

createConnection()
  .then(() => app.listen(3000, () => console.log('Server running at http://localhost:3000')))
  .catch(console.error)
