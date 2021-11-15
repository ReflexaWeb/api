import { GetGroupByCode, UpdateGroup } from '@/domain/contracts/repos'
import { UpdateGroupUsecase } from '@/domain/usecases/group'
import { GroupNotFound } from '@/errors'
import { groupData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateGroupUsecase', () => {
  let groupRepo: MockProxy<UpdateGroup & GetGroupByCode>
  let sut: UpdateGroupUsecase

  beforeAll(() => {
    groupRepo = mock()
    groupRepo.getGroupByCode.mockResolvedValue(groupData)
  })

  beforeEach(() => {
    sut = new UpdateGroupUsecase(groupRepo)
  })

  it('should be able to update an existing group', async () => {
    await sut.update(groupData.code, groupData)

    expect(groupRepo.update).toHaveBeenCalledWith(groupData.code, { ...groupData })
  })

  it('should return 422 if not group was found', async () => {
    const mockThrownError = new GroupNotFound(`Grupo de código ${groupData.code} não encontrado.`)
    groupRepo.getGroupByCode.mockResolvedValueOnce(undefined)

    await expect(sut.update(groupData.code, groupData)).rejects.toThrow(mockThrownError)

    expect(groupRepo.getGroupByCode).toHaveBeenCalledWith(groupData.code)
  })
})
