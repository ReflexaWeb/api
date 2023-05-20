import { ProductsPaginationResponse } from '@/domain/contracts/repos'
import { Product } from '@/domain/entities'
import { ProductMySQL } from '@/infra/db/postgres/typeorm/entities'

export const productData: Product = {
  name: 'any_name',
  code: 'any_code',
  reference: 'any_reference',
  unity: 'any_unity',
  fraction: 'any_fraction',
  fraction_reference: 'any_fraction_reference',
  unity_reference: 'any_unity_reference',
  product_url: 'any_product_url',
  group_code: '001',
  active: true
}

export const productCollection: ProductMySQL[] = [
  {
    id: 1,
    name: 'any_name',
    code: 'any_code',
    reference: 'any_reference',
    unity: 'any_unity',
    fraction: 'any_fraction',
    fraction_reference: 'any_fraction_reference',
    unity_reference: 'any_unity_reference',
    product_url: 'any_product_url',
    active: true,
    group_code: '001',
    created_at: new Date(),
    updated_at: undefined
  },
  {
    id: 2,
    name: 'any_name',
    code: 'any_code',
    reference: 'any_reference',
    unity: 'any_unity',
    fraction: 'any_fraction',
    fraction_reference: 'any_fraction_reference',
    unity_reference: 'any_unity_reference',
    product_url: 'any_product_url',
    active: false,
    group_code: '001',
    created_at: new Date(),
    updated_at: undefined
  }
]

export const mockProductsResponse: ProductsPaginationResponse = {
  from: 1,
  to: 10,
  per_page: 10,
  total: 11852,
  current_page: 1,
  prev_page: null,
  next_page: 2,
  data: productCollection
}
