import { CreateProduct, GetGroupByCode, GetProductByCode } from '@/domain/contracts/repos'
import { Product } from '@/domain/entities'
import { RequestError, RequiredFieldError } from '@/errors'

export class CreateProductUsecase {
  constructor (
    private readonly productRepository: CreateProduct & GetProductByCode,
    private readonly groupRepository: GetGroupByCode
  ) {}

  async create (input: CreateProduct.Input): Promise<void> {
    this.validate(input)
    const productExists = await this.productRepository.getProductByCode(input.code)
    if (!productExists) {
      const group = await this.groupRepository.getGroupByCode(input.group_code)
      if (!group) throw new RequestError(`Grupo de código [${input.group_code}] não encontrado.`)
      const product = new Product(input)
      await this.productRepository.create(product)
    } else {
      throw new RequestError(`Produto de código [${input.code}] encontrado.`)
    }
  }

  private validate (input: any): void {
    const requiredFields = ['name', 'code', 'reference', 'unity', 'group_code', 'product_url']
    const errors: string[] = []
    for (const field of requiredFields) {
      if (input[field] === '' || input[field] === undefined) {
        errors.push(`O campo [${field.toUpperCase()}] é obrigatório.`)
      }
    }
    if (errors.length) throw new RequiredFieldError(errors)
  }
}
