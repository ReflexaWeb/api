import { UpdateGroupController } from '@/controllers/group'
import { UpdateGroupUsecase } from '@/domain/usecases/group'
import { GroupRepository } from '@/infra/db/mysql/typeorm/repos'

export const makeUpdateGroupController = (): UpdateGroupController => {
  const groupRepo = new GroupRepository()
  const groupUsecase = new UpdateGroupUsecase(groupRepo)
  return new UpdateGroupController(groupUsecase)
}
