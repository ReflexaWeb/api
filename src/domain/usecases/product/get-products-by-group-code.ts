import { GetProductsByGroupCode } from '@/domain/contracts/repos'
import { DataNotFound } from '@/errors'

export class GetProductsByGroupCodeUsecase implements GetProductsByGroupCode {
  constructor (private readonly product: GetProductsByGroupCode) {}

  async getProductsByGroupCode (code: string): Promise<GetProductsByGroupCode.Output> {
    const product = await this.product.getProductsByGroupCode(code)
    if (!product) throw new DataNotFound(`Produto de código [${code}] não foi encontrado.`)
    return product
  }
}
