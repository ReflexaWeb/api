import { CreateProduct } from '@/domain/contracts/repos'
import { RequestError, RequiredFieldError } from '@/errors'
import { Request, Response } from 'express'

export class CreateProductController {
  constructor (private readonly productUsecase: CreateProduct) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.productUsecase.create(req.body)
      res.sendStatus(201)
    } catch (error) {
      this.handleError(error, res)
    }
  }

  private handleError (error: unknown, res: Response): void {
    if (error instanceof RequestError) {
      res.status(422).json({ message: error.message })
    } else if (error instanceof RequiredFieldError) {
      res.status(400).json({ message: error.errors })
    } else {
      res.status(500).json({ message: error })
    }
  }
}
