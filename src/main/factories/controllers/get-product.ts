import { GetProductsController } from '@/controllers/get-products'
import { GetProductsUsecase } from '@/domain/usecases/get-products'
import { ProductRepository } from '@/infra/db/mysql/repos'

export const makeGetProductsController = (): GetProductsController => {
  const productRepo = new ProductRepository()
  const productUsecase = new GetProductsUsecase(productRepo)
  return new GetProductsController(productUsecase)
}
