import { CreateGroup, GetGroupByCode } from '@/domain/contracts/repos'
import { CreateGroupUsecase } from '@/domain/usecases/group'
import { GroupFound, RequiredFieldError } from '@/errors'
import { groupData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateGroupUsecase', () => {
  let groupRepo: MockProxy<CreateGroup & GetGroupByCode>
  let sut: CreateGroupUsecase

  beforeAll(() => {
    groupRepo = mock()
    groupRepo.getGroupByCode.mockResolvedValue(groupData)
  })

  beforeEach(() => {
    sut = new CreateGroupUsecase(groupRepo)
  })

  it('should be able to create a new group with all data', async () => {
    groupRepo.getGroupByCode.mockResolvedValueOnce(undefined)

    await sut.create(groupData)

    expect(groupRepo.create).toHaveBeenCalledWith({ ...groupData })
    expect(groupRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should not be able to create a new group if given code already exists', async () => {
    const error = new GroupFound(`Grupo de código ${groupData.code} encontrado.`)
    groupRepo.create.mockRejectedValueOnce(error)

    const promise = sut.create(groupData)

    await expect(promise).rejects.toThrow(error)
  })

  it('should not be able to create a new group if invalid reference were provided', async () => {
    const errorsThatShouldBeGenerated = ['O campo [CODE] é obrigatório.']
    const error = new RequiredFieldError(errorsThatShouldBeGenerated)
    groupRepo.create.mockRejectedValueOnce(error)

    const invalidgroupData = { ...groupData, code: '' }

    await expect(sut.create(invalidgroupData)).rejects.toStrictEqual(error)
  })
})
