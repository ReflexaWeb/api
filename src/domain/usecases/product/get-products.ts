import { GetAllProduct } from '@/domain/contracts/repos'

export class GetProductsUsecase implements GetAllProduct {
  constructor (private readonly productRepository: GetAllProduct) {}

  async getAllProducts (filters?: GetAllProduct.Filters): Promise<GetAllProduct.Output> {
    return await this.productRepository.getAllProducts(filters as GetAllProduct.Filters)
  }
}
