import { GetProductsByGroupCode } from '@/domain/contracts/repos'

export class GetProductsByGroupCodeUsecase implements GetProductsByGroupCode {
  constructor (private readonly productRepo: GetProductsByGroupCode) {}

  async getProductsByGroupCode (code: string): Promise<GetProductsByGroupCode.Output> {
    return await this.productRepo.getProductsByGroupCode(code)
  }
}
