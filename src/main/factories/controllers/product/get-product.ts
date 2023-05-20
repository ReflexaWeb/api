import { GetProductsController } from '@/controllers/product'
import { GetProductsUsecase } from '@/domain/usecases/product'
import { ProductRepository } from '@/infra/db/postgres/typeorm/repos'

export const makeGetProductsController = (): GetProductsController => {
  const productRepo = new ProductRepository()
  const productUsecase = new GetProductsUsecase(productRepo)
  return new GetProductsController(productUsecase)
}
