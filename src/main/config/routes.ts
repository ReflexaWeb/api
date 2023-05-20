import { join, resolve } from 'node:path'
import { readdirSync, readFileSync } from 'node:fs'

import { pagination } from '@/utils'
import { limiter } from '@/main/config/rate-limiter'

import { Express, Router, json, Response } from 'express'
import cors from 'cors'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => (await import(`../routes/${file}`)).default(router))

  const docFile = readFileSync(
    resolve(__dirname, '../../../reflexa-api-doc.json'), {
      encoding: 'utf-8'
    }
  )

  const html = readFileSync(
    resolve(__dirname, '../../../reflexa-api-doc.html'), {
      encoding: 'utf-8'
    }
  )

  app.use(cors({
    origin: 'https://www.reflexa.com.br',
    methods: ['GET', 'POST', 'PUT']
  }))
  app.use(json())
  app.use(pagination)
  app.use(limiter)
  app.use('/v1', router)
  app.use('/reflexa-doc', (_, res: Response) => res.send(docFile))
  app.get('/docs', (_, res: Response) => res.send(html))
}
