export type ProductData = Product

export type ProductCollection = {
  id: number
  name: string
  code: string
  reference: string
  unity: string
  fraction: string
  unity_reference: string
  fraction_reference: string
  product_url: string
  active: boolean
  group_code: string
  created_at: Date
  updated_at?: Date
}

export class Product {
  name: string
  code: string
  reference?: string
  unity?: string
  fraction?: string
  unity_reference?: string
  fraction_reference?: string
  product_url?: string
  group_code: string
  active: boolean

  constructor (productData: ProductData) {
    this.name = productData.name
    this.code = productData.code
    this.reference = productData.reference
    this.unity = productData.unity
    this.fraction = productData.fraction
    this.product_url = productData.product_url
    this.unity_reference = productData.unity_reference
    this.fraction_reference = productData.fraction_reference
    this.group_code = productData.group_code
    this.active = true
  }
}
