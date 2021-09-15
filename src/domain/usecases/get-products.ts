import { GetAllProduct } from '@/domain/contracts/repos'

export class GetProductsUsecase implements GetAllProduct {
  constructor (private readonly product: GetAllProduct) {}

  async getAll (): Promise<GetAllProduct.Output> {
    return await this.product.getAll()
  }
}
