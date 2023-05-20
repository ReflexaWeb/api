import { CreateGroup, GetAllGroup, GetGroupByCode, UpdateGroup } from '@/domain/contracts/repos'
import { Group, GroupData } from '@/domain/entities'
import { RequestError } from '@/errors'
import { GroupMySQL, pgSource } from '@/infra/db/postgres'

import { Repository } from 'typeorm'

export class GroupRepository implements CreateGroup, GetGroupByCode, UpdateGroup, GetAllGroup {
  private readonly groupRepository: Repository<GroupMySQL>

  constructor () {
    this.groupRepository = pgSource.getRepository(GroupMySQL)
  }

  async create (group: Group): Promise<void> {
    await this.groupRepository.save(group)
  }

  async getAllGroups (filters?: GetAllGroup.Filters): Promise<GetAllGroup.Output> {
    const queryBuilder = this.groupRepository.createQueryBuilder('groups')

    if (filters?.status) {
      queryBuilder.andWhere('groups.active = :status', { status: filters.status })
    }

    queryBuilder.orderBy('groups.name', 'ASC')

    return queryBuilder.getMany()
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
