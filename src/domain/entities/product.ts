export type ProductData = {
  name: string
  code: string
  unity: string
  fraction?: string
  product_url: string
  created_at: Date
}

export class Product {
  name: string
  code: string
  unity: string
  fraction?: string
  product_url: string
  created_at: Date

  constructor (product: ProductData) {
    this.name = product.name
    this.code = product.code
    this.unity = product.unity
    this.fraction = product?.fraction
    this.product_url = product.product_url
    this.created_at = new Date()
  }
}
