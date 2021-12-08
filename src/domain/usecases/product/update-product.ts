import { GetProductByCode, UpdateProduct } from '@/domain/contracts/repos'
import { RequestError } from '@/errors'

export class UpdateProductUsecase {
  constructor (private readonly productRepository: UpdateProduct & GetProductByCode) {}

  async update (code: string, input: UpdateProduct.Input): Promise<void> {
    const product = await this.productRepository.getProductByCode(code)
    if (!product) throw new RequestError(`Produto de código ${code} não encontrado.`)
    await this.productRepository.update(code, input)
  }
}
