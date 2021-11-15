import { GetProductByCode } from '@/domain/contracts/repos'
import { DataNotFound } from '@/errors'

export class GetProductByCodeUsecase implements GetProductByCode {
  constructor (private readonly product: GetProductByCode) {}

  async getProductByCode (code: string): Promise<GetProductByCode.Output> {
    const product = await this.product.getProductByCode(code)
    if (!product) throw new DataNotFound(`Produto de código [${code}] não foi encontrado.`)
    return product
  }
}
