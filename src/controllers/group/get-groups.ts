import { GetAllGroup } from '@/domain/contracts/repos'
import { Request, Response } from 'express'

export class GetGroupsController {
  constructor (private readonly groupUsecase: GetAllGroup) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const groups = await this.groupUsecase.getAllGroups(req.query)
      res.status(200).json(groups)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
