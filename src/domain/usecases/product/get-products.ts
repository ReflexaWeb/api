import { GetAllProduct, ProductQuantity } from '@/domain/contracts/repos'

const cachedProducts: GetAllProduct.Output = []

export class GetProductsUsecase implements GetAllProduct {
  constructor (private readonly product: GetAllProduct & ProductQuantity) {}

  async getAll (): Promise<GetAllProduct.Output> {
    return await this.getCachedProducts()
  }

  private async getCachedProducts (): Promise<GetAllProduct.Output> {
    const productsQuantity = await this.product.quantity()
    const products = await this.product.getAll()
    const cachedProductsQuantity = cachedProducts.length

    /* istanbul ignore else */
    if (productsQuantity !== cachedProductsQuantity) {
      cachedProducts.length = 0
      cachedProducts.push(...products)
    }

    return cachedProducts
  }
}
