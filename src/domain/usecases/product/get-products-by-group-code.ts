import { GetProductsByGroupCode } from '@/domain/contracts/repos'

export class GetProductsByGroupCodeUsecase implements GetProductsByGroupCode {
  constructor (private readonly product: GetProductsByGroupCode) {}

  async getProductsByGroupCode (code: string): Promise<GetProductsByGroupCode.Output> {
    return await this.product.getProductsByGroupCode(code)
  }
}
