import { Product, ProductData } from '@/domain/entities'

export type ProductsPaginationResponse = {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page?: number | null
  next_page?: number | null
  data: Product[]
}

export interface CreateProduct {
  create: (input: CreateProduct.Input) => Promise<void>
}

export namespace CreateProduct {
  export type Input = ProductData
}

export interface GetAllProduct {
  getAllProducts: (filters: GetAllProduct.Filters) => Promise<GetAllProduct.Output>
}

export namespace GetAllProduct {
  export type Filters = {
    active?: boolean
    name?: string
    group_code?: string
  }
  export type Output = ProductsPaginationResponse
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

export interface GetProductsByGroupCode {
  getProductsByGroupCode: (code: string) => Promise<GetProductsByGroupCode.Output>
}

export namespace GetProductsByGroupCode {
  export type Output = Product[]
}
