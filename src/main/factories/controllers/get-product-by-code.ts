import { GetProductByCodeController } from '@/controllers'
import { GetProductByCodeUsecase } from '@/domain/usecases'
import { ProductRepository } from '@/infra/db/mysql/repos'

export const makeGetProductByCodeController = (): GetProductByCodeController => {
  const productRepo = new ProductRepository()
  const productUsecase = new GetProductByCodeUsecase(productRepo)
  return new GetProductByCodeController(productUsecase)
}
