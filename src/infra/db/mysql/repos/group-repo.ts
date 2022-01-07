import { CreateGroup, GetAllGroup, GetGroupByCode, UpdateGroup } from '@/domain/contracts/repos'
import { Group, GroupData } from '@/domain/entities'
import { RequestError } from '@/errors'
import { GroupMySQL } from '@/infra/db/mysql/entities'

import { getRepository, Repository } from 'typeorm'

export class GroupRepository implements CreateGroup, GetGroupByCode, UpdateGroup, GetAllGroup {
  private readonly repository: Repository<GroupMySQL>

  constructor () {
    this.repository = getRepository(GroupMySQL)
  }

  async create (group: Group): Promise<void> {
    await this.repository.save(group)
  }

  async getAllGroups (): Promise<Group[]> {
    return await this.repository.find()
  }

  async getGroupByCode (code: string): Promise<GetGroupByCode.Output> {
    return await this.repository.findOne({ code })
  }

  async update (code: string, updatedData: GroupData): Promise<void> {
    const group = await this.repository.findOne({ code })
    if (!group) throw new RequestError(`Grupo de código ${code} não encontrado.`)
    await this.repository.update({ code }, {
      name: updatedData.name,
      updated_at: new Date()
    })
  }
}
