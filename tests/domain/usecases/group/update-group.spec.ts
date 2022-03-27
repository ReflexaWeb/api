import { GetGroupByCode, UpdateGroup } from '@/domain/contracts/repos'
import { UpdateGroupUsecase } from '@/domain/usecases/group'
import { RequestError } from '@/errors'
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

    expect(groupRepo.update).toHaveBeenNthCalledWith(1, groupData.code, groupData)
  })

  it('should return 422 if not group was found', async () => {
    const error = new RequestError(`Grupo de código [${groupData.code}] não encontrado.`)
    groupRepo.getGroupByCode.mockResolvedValueOnce(null)

    const promise = sut.update(groupData.code, groupData)

    await expect(promise).rejects.toThrow(error)
  })
})
