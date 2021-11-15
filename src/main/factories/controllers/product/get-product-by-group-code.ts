import { GetProductsByGroupCodeController } from '@/controllers/product'
import { GetProductsByGroupCodeUsecase } from '@/domain/usecases/product'
import { ProductRepository } from '@/infra/db/mysql/repos'

export const makeGetProductsByGroupCodeController = (): GetProductsByGroupCodeController => {
  const productRepo = new ProductRepository()
  const productUsecase = new GetProductsByGroupCodeUsecase(productRepo)
  return new GetProductsByGroupCodeController(productUsecase)
}
