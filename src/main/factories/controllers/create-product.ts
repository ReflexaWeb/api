import { CreateProductController } from '@/controllers'
import { CreateProductUsecase } from '@/domain/usecases'
import { ProductRepository } from '@/infra/db/mysql/repos'

export const makeCreateProductController = (): CreateProductController => {
  const productRepo = new ProductRepository()
  const productUsecase = new CreateProductUsecase(productRepo)
  return new CreateProductController(productUsecase)
}
