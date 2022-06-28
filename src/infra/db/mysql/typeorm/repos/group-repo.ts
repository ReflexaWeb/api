import { CreateGroup, GetAllGroup, GetGroupByCode, UpdateGroup } from '@/domain/contracts/repos'
import { Group, GroupData } from '@/domain/entities'
import { RequestError } from '@/errors'
import { GroupMySQL, mysqlSource } from '@/infra/db/mysql'

import { Repository } from 'typeorm'

export class GroupRepository implements CreateGroup, GetGroupByCode, UpdateGroup, GetAllGroup {
  private readonly groupRepository: Repository<GroupMySQL>

  constructor () {
    this.groupRepository = mysqlSource.getRepository(GroupMySQL)
  }

  async create (group: Group): Promise<void> {
    await this.groupRepository.save(group)
  }

  async getAllGroups (): Promise<GetAllGroup.Output> {
    return await this.groupRepository.find({
      where: { active: true },
      order: { name: 'ASC' }
    })
  }

  async getGroupByCode (code: string): Promise<GetGroupByCode.Output> {
    return await this.groupRepository.findOneBy({ code })
  }

  async update (code: string, input: GroupData): Promise<void> {
    const group = await this.groupRepository.findOneBy({ code })
    if (!group) throw new RequestError(`Grupo de código ${code} não encontrado.`)
    await this.groupRepository.update({ code }, {
      name: input.name,
      active: input.active,
      updated_at: new Date()
    })
  }
}
