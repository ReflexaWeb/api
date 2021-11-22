import { GetProductByCode, UpdateProduct } from '@/domain/contracts/repos'
import { ProductNotFound } from '@/errors'

export class UpdateProductUsecase {
  constructor (private readonly productRepo: UpdateProduct & GetProductByCode) {}

  async update (code: string, input: UpdateProduct.Input): Promise<void> {
    const product = await this.productRepo.getProductByCode(code)
    if (!product) throw new ProductNotFound(`Produto de código ${code} não encontrado.`)
    await this.productRepo.update(code, input)
  }
}
