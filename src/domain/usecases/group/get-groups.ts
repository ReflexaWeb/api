import { GetAllGroup } from '@/domain/contracts/repos'

export class GetGroupsUsecase implements GetAllGroup {
  constructor (private readonly groupRepository: GetAllGroup) {}

  async getAllGroups (filters?: GetAllGroup.Filters): Promise<GetAllGroup.Output> {
    return await this.groupRepository.getAllGroups(filters as GetAllGroup.Filters)
  }
}
