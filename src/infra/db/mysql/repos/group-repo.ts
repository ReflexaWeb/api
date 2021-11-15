import { CreateGroup, GetAllGroup, GetGroupByCode, UpdateGroup } from '@/domain/contracts/repos'
import { Group, GroupData } from '@/domain/entities'
import { ProductNotFound } from '@/errors'
import { GroupMySQL } from '@/infra/db/mysql/entities'

import { getRepository } from 'typeorm'

export class GroupRepository implements CreateGroup, GetGroupByCode, UpdateGroup, GetAllGroup {
  async create (input: CreateGroup.Input): Promise<void> {
    const group = getRepository(GroupMySQL)
    await group.save(input)
  }

  async getAllGroups (): Promise<Group[]> {
    const groups = getRepository(GroupMySQL)
    return await groups.find()
  }

  async getGroupByCode (code: string): Promise<GetGroupByCode.Output> {
    const groupRepo = getRepository(GroupMySQL)
    const group = groupRepo.findOne({ code })
    if (group !== undefined) return group
  }

  async update (code: string, updatedData: GroupData): Promise<void> {
    const groupRepo = getRepository(GroupMySQL)
    const group = await groupRepo.findOne({ code })
    if (!group) throw new ProductNotFound(`Grupo de código ${code} não encontrado.`)
    await groupRepo.update({ code }, {
      name: updatedData.name,
      updated_at: new Date()
    })
  }
}
