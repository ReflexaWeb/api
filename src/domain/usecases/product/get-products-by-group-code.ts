import { GetProductsByGroupCode } from '@/domain/contracts/repos'

export class GetProductsByGroupCodeUsecase implements GetProductsByGroupCode {
  constructor (private readonly productRepository: GetProductsByGroupCode) {}

  async getProductsByGroupCode (code: string): Promise<GetProductsByGroupCode.Output> {
    return await this.productRepository.getProductsByGroupCode(code)
  }
}
