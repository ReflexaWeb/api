import { join } from 'node:path'
import { readdirSync } from 'node:fs'

import { pagination } from '@/utils'
import { limiter } from '@/main/config/rate-limiter'

import express, { Express, Router, json } from 'express'
import cors from 'cors'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => (await import(`../routes/${file}`)).default(router))

  const docFile = express.static(join(__dirname, '..', '..', '..', 'docs'))

  app.use(cors({
    origin: 'https://www.reflexa.com.br',
    methods: ['GET', 'POST', 'PUT']
  }))
  app.use(json())
  app.use(pagination)
  app.use(limiter)
  app.use('/v1', router)
  app.use('/docs', docFile)
}
