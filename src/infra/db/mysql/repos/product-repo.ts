import { CreateProduct, GetAllProduct, GetProductByCode, GetProductsByGroupCode, UpdateProduct } from '@/domain/contracts/repos'
import { Product, ProductData } from '@/domain/entities'
import { ProductNotFound } from '@/errors'
import { ProductMySQL } from '@/infra/db/mysql/entities'

import { FilterQuery, getRepository, Like } from 'typeorm'

export class ProductRepository implements CreateProduct, GetProductByCode, UpdateProduct, GetAllProduct, GetProductsByGroupCode {
  async create (input: CreateProduct.Input): Promise<void> {
    const productRepo = getRepository(ProductMySQL)
    const product = new Product(input)
    await productRepo.save(product)
  }

  async getAll (filters?: GetAllProduct.Input): Promise<GetAllProduct.Output> {
    const products = getRepository(ProductMySQL)
    const where: FilterQuery<ProductMySQL> = {}
    if (filters?.active) where.active = filters.active
    if (filters?.name) where.name = Like(`%${filters.name}%`)
    return await products.find({ where })
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
}
