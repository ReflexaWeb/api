import { CreateGroup } from '@/domain/contracts/repos'
import { GroupFound, RequiredFieldError } from '@/errors'
import { Request, Response } from 'express'

export class CreateGroupController {
  constructor (private readonly groupUseCase: CreateGroup) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.groupUseCase.create(req.body)
      res.sendStatus(201)
    } catch (error) {
      this.handleError(error, res)
    }
  }

  private handleError (error: unknown, res: Response): void {
    if (error instanceof GroupFound) {
      res.status(422).json({ message: error.message })
    } else if (error instanceof RequiredFieldError) {
      res.status(400).json({ message: error.errors })
    } else {
      res.status(500).json({ message: error })
    }
  }
}
