import { CreateGroup, GetGroupByCode } from '@/domain/contracts/repos'
import { GroupFound, RequiredFieldError } from '@/errors'

export class CreateGroupUsecase {
  constructor (private readonly group: CreateGroup & GetGroupByCode) {}

  async create (input: CreateGroup.Input): Promise<void> {
    this.validate(input)
    const GroupExists = await this.group.getGroupByCode(input.code)
    if (!GroupExists) {
      await this.group.create(input)
    } else {
      throw new GroupFound(`Grupo de código ${input.code} encontrado.`)
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
