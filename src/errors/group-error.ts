export class GroupFound extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'GroupFound'
  }
}

export class GroupNotFound extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'GroupNotFound'
  }
}
