import { setupRoutes } from '@/main/config/routes'

import express from 'express'

export const app = express()

setupRoutes(app)
