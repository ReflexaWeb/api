import { UpdateProduct } from '@/domain/contracts/repos'
import { RequestError } from '@/errors'

import { Request, Response } from 'express'

export class UpdateProductController {
  constructor (private readonly productUsecase: UpdateProduct) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.productUsecase.update(req.params.code, req.body)
      res.sendStatus(200)
    } catch (error) {
      this.handleError(error, res)
    }
  }

  private handleError (error: any, res: Response): void {
    if (error instanceof RequestError) {
      res.status(422).json({ message: error.message })
    } else {
      res.status(500).json({ message: error })
    }
  }
}
