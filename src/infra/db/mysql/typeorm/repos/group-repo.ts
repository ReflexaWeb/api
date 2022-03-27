import { CreateGroup, GetAllGroup, GetGroupByCode, UpdateGroup } from '@/domain/contracts/repos'
import { Group, GroupData } from '@/domain/entities'
import { RequestError } from '@/errors'
import { GroupMySQL, mysqlSource } from '@/infra/db/mysql'

import { Repository } from 'typeorm'

export class GroupRepository implements CreateGroup, GetGroupByCode, UpdateGroup, GetAllGroup {
  private readonly repository: Repository<GroupMySQL>

  constructor () {
    this.repository = mysqlSource.getRepository(GroupMySQL)
  }

  async create (group: Group): Promise<void> {
    await this.repository.save(group)
  }

  async getAllGroups (): Promise<GetAllGroup.Output> {
    return await this.repository.find({
      order: {
        name: 'ASC'
      }
    })
  }

  async getGroupByCode (code: string): Promise<GetGroupByCode.Output> {
    return await this.repository.findOneBy({ code })
  }

  async update (code: string, updatedData: GroupData): Promise<void> {
    const group = await this.repository.findOneBy({ code })
    if (!group) throw new RequestError(`Grupo de código ${code} não encontrado.`)
    await this.repository.update({ code }, {
      name: updatedData.name,
      updated_at: new Date()
    })
  }
}
