import { Request, Response, NextFunction } from 'express'

export const cors = (_: Request, response: Response, next: NextFunction): void => {
  response.set('access-control-allow-origin', 'https://www.reflexa.com.br/')
  response.set('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST'])
  next()
}
