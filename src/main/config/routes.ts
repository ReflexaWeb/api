import { swaggerDocument } from '@/main/docs'

import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'
import { serve, setup } from 'swagger-ui-express'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => (await import(`../routes/${file}`)).default(router))

  app.use('/api/v1', router)
  app.use('/api/docs', serve, setup(swaggerDocument))
}
