export type GroupData = Group

export class Group {
  name: string
  code: string

  constructor (GroupData: GroupData) {
    this.name = GroupData.name
    this.code = GroupData.code
  }
}
