import { GetGroupByCode, UpdateGroup } from '@/domain/contracts/repos'
import { RequestError } from '@/errors'

export class UpdateGroupUsecase {
  constructor (private readonly groupRepository: UpdateGroup & GetGroupByCode) {}

  async update (code: string, input: UpdateGroup.Input): Promise<void> {
    const group = await this.groupRepository.getGroupByCode(code)
    if (!group) throw new RequestError(`Grupo de código [${code}] não encontrado.`)
    await this.groupRepository.update(code, input)
  }
}
