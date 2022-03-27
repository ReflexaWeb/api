import { GetProductByCodeController } from '@/controllers/product'
import { GetProductByCodeUsecase } from '@/domain/usecases/product'
import { ProductRepository } from '@/infra/db/mysql/typeorm/repos'

export const makeGetProductByCodeController = (): GetProductByCodeController => {
  const productRepo = new ProductRepository()
  const productUsecase = new GetProductByCodeUsecase(productRepo)
  return new GetProductByCodeController(productUsecase)
}
