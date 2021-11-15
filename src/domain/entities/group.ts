export type GroupData = Group

export class Group {
  name: string
  code: string

  constructor (groupData: GroupData) {
    this.name = groupData.name
    this.code = groupData.code
  }
}
