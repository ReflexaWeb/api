import { GetAllProduct } from '@/domain/contracts/repos'

export class GetProductsUsecase implements GetAllProduct {
  constructor (private readonly productRepo: GetAllProduct) {}

  async getAll (filters?: GetAllProduct.Input): Promise<GetAllProduct.Output> {
    return await this.productRepo.getAll(filters as GetAllProduct.Input)
  }
}
