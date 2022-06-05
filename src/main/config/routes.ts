import { pagination } from '@/utils'
import { limiter } from '@/main/config/rate-limiter'

import { Express, Router, json } from 'express'
import { readdirSync } from 'fs'
import { join, resolve } from 'path'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'
import YAML from 'yamljs'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => (await import(`../routes/${file}`)).default(router))

  const swaggerDocument = YAML.load(resolve(__dirname, '../../../api-spec.yaml'))

  app.use(cors({ origin: 'https://www.reflexa.com.br' }))
  app.use(json())
  app.use(pagination)
  app.use(limiter)
  app.use('/v1', router)
  app.use('/docs', serve, setup(swaggerDocument))
}
