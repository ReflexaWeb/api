import { CreateProduct, GetAllProduct, GetProductByCode, GetProductsByGroupCode, UpdateProduct } from '@/domain/contracts/repos'
import { Product, ProductData } from '@/domain/entities'
import { RequestError } from '@/errors'
import { ProductMySQL } from '@/infra/db/mysql/entities'

import { getRepository, Repository } from 'typeorm'

export class ProductRepository implements CreateProduct, GetProductByCode, UpdateProduct, GetAllProduct, GetProductsByGroupCode {
  private readonly repository: Repository<ProductMySQL>

  constructor () {
    this.repository = getRepository(ProductMySQL)
  }

  async create (product: Product): Promise<void> {
    await this.repository.save(product)
  }

  async getAllProducts (filters?: GetAllProduct.Filters): Promise<GetAllProduct.Output> {
    return await this.mountQueryBuilder(filters)
  }

  async getProductByCode (code: string): Promise<GetProductByCode.Output> {
    return await this.repository.findOne({ code })
  }

  async update (code: string, updatedData: ProductData): Promise<void> {
    const product = await this.repository.findOne({ code })
    if (!product) throw new RequestError(`Produto de código ${code} não encontrado.`)
    await this.repository.update({ code }, {
      name: updatedData.name,
      reference: updatedData?.reference ?? undefined,
      unity: updatedData?.unity ?? undefined,
      fraction: updatedData?.fraction ?? undefined,
      product_url: updatedData?.product_url ?? undefined,
      active: updatedData?.active ?? true,
      group_code: updatedData.group_code,
      updated_at: new Date()
    })
  }

  async getProductsByGroupCode (group_code: string): Promise<GetProductsByGroupCode.Output> {
    const teste = await this.repository.find({
      where: {
        group_code,
        active: true
      }
    })
    return teste
  }

  private async mountQueryBuilder (filters?: GetAllProduct.Filters): Promise<GetAllProduct.Output> {
    const queryBuilder = this.repository.createQueryBuilder('products')

    if (filters?.active) {
      queryBuilder.andWhere(
        'products.active = :active', { active: filters.active }
      )
    }

    if (filters?.group_code) {
      queryBuilder.andWhere(
        'products.group_code = :group_code', { group_code: filters.group_code }
      )
    }

    if (filters?.name) {
      queryBuilder.andWhere('products.name LIKE :name', { name: `%${filters.name}%` })
    }

    return queryBuilder.paginate()
  }
}
