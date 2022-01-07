import { CreateGroup, GetGroupByCode } from '@/domain/contracts/repos'
import { Group } from '@/domain/entities'
import { RequestError, RequiredFieldError } from '@/errors'

export class CreateGroupUsecase {
  constructor (private readonly groupRepository: CreateGroup & GetGroupByCode) {}

  async create (input: CreateGroup.Input): Promise<void> {
    this.validateRequiredFields(input)
    const groupExists = await this.groupRepository.getGroupByCode(input.code)
    if (groupExists) throw new RequestError(`Grupo de código ${input.code} encontrado.`)
    const group = new Group(input)
    await this.groupRepository.create(group)
  }

  private validateRequiredFields (input: any): void {
    const requiredFields = ['name', 'code']
    const errors: string[] = []
    for (const field of requiredFields) {
      if (input[field] === '' || input[field] === undefined) {
        errors.push(`O campo [${field.toUpperCase()}] é obrigatório.`)
      }
    }
    if (errors.length) throw new RequiredFieldError(errors)
  }
}
