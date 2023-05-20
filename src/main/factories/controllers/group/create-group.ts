import { CreateGroupController } from '@/controllers/group'
import { CreateGroupUsecase } from '@/domain/usecases/group'
import { GroupRepository } from '@/infra/db/postgres/typeorm/repos'

export const makeCreateGroupController = (): CreateGroupController => {
  const groupRepo = new GroupRepository()
  const groupUsecase = new CreateGroupUsecase(groupRepo)
  return new CreateGroupController(groupUsecase)
}
