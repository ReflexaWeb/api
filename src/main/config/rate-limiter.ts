import rateLimit from 'express-rate-limit'

const ONE_MINUTE = 1 * 60 * 1000
const MAX_REQUESTS = 1000

export const limiter = rateLimit({
  windowMs: ONE_MINUTE,
  max: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false
})
