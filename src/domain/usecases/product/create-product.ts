import { CreateProduct, GetProductByCode } from '@/domain/contracts/repos'
import { ProductFound, RequiredFieldError } from '@/errors'

export class CreateProductUsecase {
  constructor (private readonly product: CreateProduct & GetProductByCode) {}

  async create (input: CreateProduct.Input): Promise<void> {
    this.validate(input)
    const productExists = await this.product.getProductByCode(input.code)
    if (!productExists) {
      await this.product.create(input)
    } else {
      throw new ProductFound(`Produto de código ${input.code} encontrado.`)
    }
  }

  private validate (input: any): void {
    const requiredFields = ['name', 'code', 'reference', 'unity', 'product_url']
    const errors: string[] = []
    for (const field of requiredFields) {
      if (input[field] === '' || input[field] === undefined) {
        errors.push(`O campo [${field.toUpperCase()}] é obrigatório.`)
      }
    }
    if (errors.length) throw new RequiredFieldError(errors)
  }
}
