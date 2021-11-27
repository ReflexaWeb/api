import { GetAllProduct } from '@/domain/contracts/repos'

export class GetProductsUsecase implements GetAllProduct {
  constructor (private readonly productRepo: GetAllProduct) {}

  async getAllProducts (filters?: GetAllProduct.Filters): Promise<GetAllProduct.Output> {
    return await this.productRepo.getAllProducts(filters as GetAllProduct.Filters)
  }
}
