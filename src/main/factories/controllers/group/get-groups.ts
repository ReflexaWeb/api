import { GetGroupsController } from '@/controllers/group'
import { GetGroupsUsecase } from '@/domain/usecases/group'
import { GroupRepository } from '@/infra/db/postgres/typeorm/repos'

export const makeGetGroupsController = (): GetGroupsController => {
  const groupRepo = new GroupRepository()
  const groupUseCase = new GetGroupsUsecase(groupRepo)
  return new GetGroupsController(groupUseCase)
}
