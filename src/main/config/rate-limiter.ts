import rateLimit from 'express-rate-limit'

const ONE_MINUTE = 1 * 60 * 1000

export const limiter = rateLimit({
  windowMs: ONE_MINUTE,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false
})
