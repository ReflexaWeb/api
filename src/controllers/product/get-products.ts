import { GetAllProduct } from '@/domain/contracts/repos'

import { Request, Response } from 'express'

export class GetProductsController {
  constructor (private readonly productUsecase: GetAllProduct) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productUsecase.getAllProducts(req.query)
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
