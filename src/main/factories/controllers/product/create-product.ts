import { CreateProductController } from '@/controllers/product'
import { CreateProductUsecase } from '@/domain/usecases/product'
import { GroupRepository, ProductRepository } from '@/infra/db/postgres/typeorm/repos'

export const makeCreateProductController = (): CreateProductController => {
  const productRepo = new ProductRepository()
  const groupRepo = new GroupRepository()
  const productUsecase = new CreateProductUsecase(productRepo, groupRepo)
  return new CreateProductController(productUsecase)
}
