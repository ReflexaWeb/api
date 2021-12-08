import { GetProductsByGroupCode } from '@/domain/contracts/repos'
import { RequestError } from '@/errors'

import { Request, Response } from 'express'

export class GetProductsByGroupCodeController {
  constructor (private readonly productUsecase: GetProductsByGroupCode) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productUsecase.getProductsByGroupCode(req.params.group_code)
      res.status(200).json(products)
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
