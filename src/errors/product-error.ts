export class ProductFound extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ProductFound'
  }
}
