import { CreateProduct, GetAllProduct, GetProductByCode, GetProductsByGroupCode, UpdateProduct } from '@/domain/contracts/repos'
import { Product, ProductData } from '@/domain/entities'
import { ProductNotFound } from '@/errors'
import { ProductMySQL } from '@/infra/db/mysql/entities'

import { getRepository } from 'typeorm'

export class ProductRepository implements CreateProduct, GetProductByCode, UpdateProduct, GetAllProduct, GetProductsByGroupCode {
  async create (input: CreateProduct.Input): Promise<void> {
    const productRepo = getRepository(ProductMySQL)
    const product = new Product(input)
    await productRepo.save(product)
  }

  async getAllProducts (filters?: GetAllProduct.Filters): Promise<GetAllProduct.Output> {
    return await this.mountQueryBuilder(filters)
  }

  async getProductByCode (code: string): Promise<GetProductByCode.Output> {
    const productRepo = getRepository(ProductMySQL)
    const product = productRepo.findOne({ code })
    if (product !== undefined) return product
  }

  async update (code: string, updatedData: ProductData): Promise<void> {
    const productRepo = getRepository(ProductMySQL)
    const product = await productRepo.findOne({ code })
    if (!product) throw new ProductNotFound(`Produto de código ${code} não encontrado.`)
    await productRepo.update({ code }, {
      name: updatedData.name,
      reference: updatedData.reference,
      unity: updatedData.unity,
      fraction: updatedData.fraction,
      product_url: updatedData.product_url,
      active: updatedData.active,
      group_code: updatedData.group_code,
      updated_at: new Date()
    })
  }

  async getProductsByGroupCode (group_code: string): Promise<GetProductsByGroupCode.Output> {
    const productRepo = getRepository(ProductMySQL)
    return productRepo.find({
      where: {
        group_code,
        active: true
      }
    })
  }

  private async mountQueryBuilder (filters?: GetAllProduct.Filters): Promise<GetAllProduct.Output> {
    const productRepo = getRepository(ProductMySQL)
    const queryBuilder = productRepo.createQueryBuilder('products')

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
