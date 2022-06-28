import { GetAllProduct, GetProductByCode, GetProductsByGroupCode, UpdateProduct } from '@/domain/contracts/repos'
import { Product, ProductData } from '@/domain/entities'
import { RequestError } from '@/errors'
import { ProductMySQL, mysqlSource } from '@/infra/db/mysql'

import { Repository } from 'typeorm'

export class ProductRepository implements GetProductByCode, UpdateProduct, GetAllProduct, GetProductsByGroupCode {
  private readonly productRepository: Repository<ProductMySQL>

  constructor () {
    this.productRepository = mysqlSource.getRepository(ProductMySQL)
  }

  async create (product: Product): Promise<void> {
    await this.productRepository.save(product)
  }

  async getAllProducts (filters?: GetAllProduct.Filters): Promise<GetAllProduct.Output> {
    return await this.mountQueryBuilder(filters)
  }

  async getProductByCode (code: string): Promise<GetProductByCode.Output> {
    return await this.productRepository.findOneBy({ code })
  }

  async update (code: string, input: ProductData): Promise<void> {
    const product = await this.getProductByCode(code)
    if (!product) throw new RequestError(`Produto de código ${code} não encontrado.`)
    await this.productRepository.update({ code }, {
      ...input,
      code: product.code,
      active: input.active,
      updated_at: new Date()
    })
  }

  async getProductsByGroupCode (group_code: string): Promise<GetProductsByGroupCode.Output> {
    return await this.productRepository.find({
      where: { group_code }
    })
  }

  private async mountQueryBuilder (filters?: GetAllProduct.Filters): Promise<GetAllProduct.Output> {
    const queryBuilder = this.productRepository.createQueryBuilder('products')

    if (filters?.group_code) {
      queryBuilder.andWhere(
        'products.group_code = :group_code', { group_code: filters.group_code }
      )
    }

    if (filters?.name) {
      queryBuilder.andWhere('products.name LIKE :name', { name: `%${filters.name}%` })
    }

    queryBuilder.andWhere('products.active = 1')
    queryBuilder.orderBy('products.name', 'ASC')

    return queryBuilder.paginate()
  }
}
