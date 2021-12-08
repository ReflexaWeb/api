import { GetProductByCode } from '@/domain/contracts/repos'
import { RequestError } from '@/errors'

export class GetProductByCodeUsecase implements GetProductByCode {
  constructor (private readonly productRepository: GetProductByCode) {}

  async getProductByCode (code: string): Promise<GetProductByCode.Output> {
    const product = await this.productRepository.getProductByCode(code)
    if (!product) throw new RequestError(`Produto de código [${code}] não foi encontrado.`)
    return product
  }
}
