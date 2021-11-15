import { CreateProduct, GetAllProduct, GetProductByCode, GetProductsByGroupCode, ProductQuantity, UpdateProduct } from '@/domain/contracts/repos'
import { Product, ProductData } from '@/domain/entities'
import { ProductNotFound } from '@/errors'
import { ProductMySQL } from '@/infra/db/mysql/entities'

import { getRepository } from 'typeorm'

export class ProductRepository implements CreateProduct, GetProductByCode, UpdateProduct, GetAllProduct, ProductQuantity, GetProductsByGroupCode {
  async create (input: CreateProduct.Input): Promise<void> {
    const product = getRepository(ProductMySQL)
    await product.save(input)
  }

  async getAll (): Promise<Product[]> {
    const products = getRepository(ProductMySQL)
    return await products.find()
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

  async quantity (): Promise<ProductQuantity.Output> {
    const products = getRepository(ProductMySQL)
    return await products.count()
  }

  async getProductsByGroupCode (group_code: string): Promise<GetProductsByGroupCode.Output> {
    const productRepo = getRepository(ProductMySQL)
    return productRepo.find({ group_code })
  }
}
