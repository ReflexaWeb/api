import { CreateProduct, GetAllProduct, GetProductByCode, UpdateProduct } from '@/domain/contracts/repos'
import { Product, ProductData } from '@/domain/entities'
import { ProductNotFound } from '@/errors'
import { ProductMySQL } from '@/infra/db/mysql/entities'

import { getRepository } from 'typeorm'

export class ProductRepository implements CreateProduct, GetProductByCode, UpdateProduct, GetAllProduct {
  async create (input: CreateProduct.Input): Promise<void> {
    const product = getRepository(ProductMySQL)
    await product.save(input)
  }

  async getAll (): Promise<Product[]> {
    const products = getRepository(ProductMySQL)
    return await products.find()
  }

  async getByCode (code: string): Promise<GetProductByCode.Output> {
    const productRepo = getRepository(ProductMySQL)
    const product = productRepo.findOne({ code })
    if (product !== undefined) return product
  }

  async update (code: string, updatedData: ProductData): Promise<void> {
    const productRepo = getRepository(ProductMySQL)
    const product = await productRepo.findOne({ code })

    if (product !== undefined) {
      await productRepo.update({ code }, {
        name: updatedData.name,
        unity: updatedData.unity,
        fraction: updatedData.fraction,
        product_url: updatedData.product_url,
        updated_at: new Date()
      })
    } else {
      throw new ProductNotFound(`Produto de código ${code} não encontrado`)
    }
  }
}
