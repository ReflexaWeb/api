export type GroupData = Group

export class Group {
  name: string
  code: string
  active: boolean

  constructor (groupData: GroupData) {
    this.name = groupData.name
    this.code = groupData.code
    this.active = true
  }
}
