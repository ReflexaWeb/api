import { GetProductByCode } from '@/domain/contracts/repos'
import { RequestError } from '@/errors'

import { Request, Response } from 'express'

export class GetProductByCodeController {
  constructor (private readonly productUsecase: GetProductByCode) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const product = await this.productUsecase.getProductByCode(req.params.code)
      res.status(200).json(product)
    } catch (error) {
      this.handleError(error, res)
    }
  }

  private handleError (error: any, res: Response): void {
    if (error instanceof RequestError) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: error })
    }
  }
}
