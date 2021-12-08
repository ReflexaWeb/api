import { CreateGroup, GetGroupByCode } from '@/domain/contracts/repos'
import { Group } from '@/domain/entities'
import { RequestError, RequiredFieldError } from '@/errors'

export class CreateGroupUsecase {
  constructor (private readonly groupRepositoru: CreateGroup & GetGroupByCode) {}

  async create (input: CreateGroup.Input): Promise<void> {
    this.validate(input)
    const GroupExists = await this.groupRepositoru.getGroupByCode(input.code)
    if (!GroupExists) {
      const group = new Group(input)
      await this.groupRepositoru.create(group)
    } else {
      throw new RequestError(`Grupo de código ${input.code} encontrado.`)
    }
  }

  private validate (input: any): void {
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
