import { GetGroupByCode, UpdateGroup } from '@/domain/contracts/repos'
import { GroupNotFound } from '@/errors'

export class UpdateGroupUsecase {
  constructor (private readonly group: UpdateGroup & GetGroupByCode) {}

  async update (code: string, input: UpdateGroup.Input): Promise<void> {
    const group = await this.group.getGroupByCode(code)
    if (!group) throw new GroupNotFound(`Grupo de código ${code} não encontrado.`)
    await this.group.update(code, input)
  }
}
