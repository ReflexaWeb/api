import { Product, ProductData } from '@/domain/entities'

export interface CreateProduct {
  create: (input: CreateProduct.Input) => Promise<void>
}

export namespace CreateProduct {
  export type Input = ProductData
}

export interface GetProductByCode {
  getByCode: (code: string) => Promise<GetProductByCode.Output>
}

export namespace GetProductByCode {
  export type Output = Product | undefined
}
