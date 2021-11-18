import { GetAllProduct } from '@/domain/contracts/repos'

export class GetProductsUsecase implements GetAllProduct {
  constructor (private readonly product: GetAllProduct) {}

  async getAll (filters?: GetAllProduct.Input): Promise<GetAllProduct.Output> {
    return await this.product.getAll({ active: filters?.active })
  }
}
