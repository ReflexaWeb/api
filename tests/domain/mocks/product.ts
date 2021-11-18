import { Product } from '@/domain/entities'

export const productData: Product = {
  name: 'any_name',
  code: 'any_code',
  reference: 'any_reference',
  unity: 'any_unity',
  fraction: 'any_fraction',
  product_url: 'any_product_url',
  active: true,
  group_code: '001'
}

export const productDataCollection: Product[] = [
  {
    name: 'any_name',
    code: 'any_code',
    reference: 'any_reference',
    unity: 'any_unity',
    fraction: 'any_fraction',
    product_url: 'any_product_url',
    active: true,
    group_code: '001'
  },
  {
    name: 'any_name',
    code: 'any_code',
    reference: 'any_reference',
    unity: 'any_unity',
    fraction: 'any_fraction',
    product_url: 'any_product_url',
    active: false,
    group_code: '001'
  }
]
