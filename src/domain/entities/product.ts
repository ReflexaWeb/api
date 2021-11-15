export type ProductData = Omit<Product, 'created_at'>

export class Product {
  name: string
  code: string
  reference: string
  unity: string
  fraction?: string
  product_url: string
  active: boolean
  created_at: Date

  constructor (productData: ProductData) {
    this.name = productData.name
    this.code = productData.code
    this.reference = productData.reference
    this.unity = productData.unity
    this.fraction = productData?.fraction
    this.product_url = productData.product_url
    this.active = true
    this.created_at = new Date()
  }
}
