import { UpdateGroupController } from '@/controllers/group'
import { UpdateGroupUsecase } from '@/domain/usecases/group'
import { GroupRepository, ProductRepository } from '@/infra/db/mysql/typeorm/repos'

export const makeUpdateGroupController = (): UpdateGroupController => {
  const groupRepo = new GroupRepository()
  const productRepo = new ProductRepository()
  const groupUsecase = new UpdateGroupUsecase(groupRepo, productRepo)
  return new UpdateGroupController(groupUsecase)
}
