import { Group, GroupData } from '@/domain/entities'

export interface CreateGroup {
  create: (input: CreateGroup.Input) => Promise<void>
}

export namespace CreateGroup {
  export type Input = GroupData
}

export interface GetGroupByCode {
  getGroupByCode: (code: string) => Promise<GetGroupByCode.Output>
}

export namespace GetGroupByCode {
  export type Output = Group | null
}

export interface GetAllGroup {
  getAllGroups: (filters?: GetAllGroup.Filters) => Promise<GetAllGroup.Output>
}

export namespace GetAllGroup {
  export type Filters = { active?: boolean }
  export type Output = Group[]
}

export interface UpdateGroup {
  update: (code: string, input: UpdateGroup.Input) => Promise<UpdateGroup.Output>
}

export namespace UpdateGroup {
  export type Input = GroupData
  export type Output = void | Error
}
