export type ProductData = Product

export class Product {
  name: string
  code: string
  reference: string
  unity: string
  fraction?: string
  product_url: string
  active: boolean
  group_code: string

  constructor (productData: ProductData) {
    this.name = productData.name
    this.code = productData.code
    this.reference = productData.reference
    this.unity = productData.unity
    this.fraction = productData?.fraction
    this.product_url = productData.product_url
    this.group_code = productData.group_code
    this.active = true
  }
}
