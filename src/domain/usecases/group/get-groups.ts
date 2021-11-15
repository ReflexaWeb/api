import { GetAllGroup } from '@/domain/contracts/repos'

export class GetGroupsUsecase implements GetAllGroup {
  constructor (private readonly group: GetAllGroup) {}

  async getAllGroups (): Promise<GetAllGroup.Output> {
    return await this.group.getAllGroups()
  }
}
