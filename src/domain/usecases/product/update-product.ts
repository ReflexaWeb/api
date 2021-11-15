import { GetProductByCode, UpdateProduct } from '@/domain/contracts/repos'
import { ProductNotFound } from '@/errors'

export class UpdateProductUsecase {
  constructor (private readonly product: UpdateProduct & GetProductByCode) {}

  async update (code: string, input: UpdateProduct.Input): Promise<void> {
    const product = await this.product.getProductByCode(code)
    if (!product) throw new ProductNotFound(`Produto de código ${code} não encontrado.`)
    await this.product.update(code, input)
  }
}
