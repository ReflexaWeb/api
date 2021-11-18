import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join, resolve } from 'path'
import { serve, setup } from 'swagger-ui-express'
import YAML from 'yamljs'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => (await import(`../routes/${file}`)).default(router))

  const swaggerDocument = YAML.load(resolve(__dirname, '../docs/api-spec.yaml'))

  app.use('/api/v1', router)
  app.use('/api/docs', serve, setup(swaggerDocument))
}
