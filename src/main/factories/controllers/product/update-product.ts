import { UpdateProductController } from '@/controllers/product'
import { UpdateProductUsecase } from '@/domain/usecases/product'
import { ProductRepository } from '@/infra/db/mysql/repos'

export const makeUpdateProductController = (): UpdateProductController => {
  const productRepo = new ProductRepository()
  const productUsecase = new UpdateProductUsecase(productRepo)
  return new UpdateProductController(productUsecase)
}
