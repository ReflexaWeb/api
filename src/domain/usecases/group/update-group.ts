import { GetGroupByCode, GetProductsByGroupCode, UpdateGroup, UpdateProduct } from '@/domain/contracts/repos'
import { RequestError } from '@/errors'

export class UpdateGroupUsecase {
  constructor (
    private readonly groupsRepository: UpdateGroup & GetGroupByCode,
    private readonly productsRepository: UpdateProduct & GetProductsByGroupCode
  ) {}

  async update (code: string, input: UpdateGroup.Input): Promise<void> {
    const group = await this.groupsRepository.getGroupByCode(code)
    if (!group) throw new RequestError(`Grupo de código [${code}] não encontrado.`)
    const products = await this.productsRepository.getProductsByGroupCode(group.code)
    const productsToUpdate = []
    for (const product of products) {
      const productItem = this.productsRepository.update(product.code, {
        active: input.active
      } as any as UpdateProduct.Input)
      productsToUpdate.push(productItem)
    }
    const groupToUpdate = this.groupsRepository.update(code, input)
    await Promise.all([groupToUpdate, productsToUpdate])
  }
}
