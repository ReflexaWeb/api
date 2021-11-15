export class ProductFound extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ProductFound'
  }
}

export class ProductNotFound extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ProductNotFound'
  }
}
