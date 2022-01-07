import { CreateProduct, GetGroupByCode, GetProductByCode } from '@/domain/contracts/repos'
import { Product } from '@/domain/entities'
import { RequestError, RequiredFieldError } from '@/errors'

export class CreateProductUsecase {
  constructor (
    private readonly productRepository: CreateProduct & GetProductByCode,
    private readonly groupRepository: GetGroupByCode
  ) {}

  async create (input: CreateProduct.Input): Promise<void> {
    this.validateRequiredFields(input)
    const productExists = await this.productRepository.getProductByCode(input.code)
    if (productExists) throw new RequestError(`Produto de código [${input.code}] encontrado.`)
    const group = await this.groupRepository.getGroupByCode(input.group_code)
    if (!group) throw new RequestError(`Grupo de código [${input.group_code}] não encontrado.`)
    const product = new Product(input)
    await this.productRepository.create(product)
  }

  private validateRequiredFields (input: any): void {
    const requiredFields = ['name', 'code', 'group_code']
    const errors: string[] = []
    for (const field of requiredFields) {
      if (input[field] === '' || input[field] === undefined) {
        errors.push(`O campo [${field.toUpperCase()}] é obrigatório.`)
      }
    }
    if (errors.length) throw new RequiredFieldError(errors)
  }
}
