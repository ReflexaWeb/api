import { Product, ProductData } from '@/domain/entities'

export interface CreateProduct {
  create: (input: CreateProduct.Input) => Promise<void>
}

export namespace CreateProduct {
  export type Input = ProductData
}

export interface GetAllProduct {
  getAll: () => Promise<GetAllProduct.Output>
}

export namespace GetAllProduct {
  export type Output = Product[]
}

export interface ProductQuantity {
  quantity: () => Promise<ProductQuantity.Output>
}

export namespace ProductQuantity {
  export type Output = number
}

export interface GetProductByCode {
  getProductByCode: (code: string) => Promise<GetProductByCode.Output>
}

export namespace GetProductByCode {
  export type Output = Product | undefined
}

export interface UpdateProduct {
  update: (code: string, input: UpdateProduct.Input) => Promise<UpdateProduct.Output>
}

export namespace UpdateProduct {
  export type Input = ProductData
  export type Output = void | Error
}
