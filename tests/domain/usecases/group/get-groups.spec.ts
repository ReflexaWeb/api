import { GetGroupsUsecase } from '@/domain/usecases/group'
import { GetAllGroup } from '@/domain/contracts/repos'
import { mockGroup } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetGroupsUsecase', () => {
  let groupRepo: MockProxy<GetAllGroup>
  let sut: GetGroupsUsecase

  beforeAll(() => {
    groupRepo = mock()
  })

  beforeEach(() => {
    sut = new GetGroupsUsecase(groupRepo)
  })

  it('should be able return all groups', async () => {
    groupRepo.getAllGroups.mockResolvedValue([mockGroup])

    const response = await sut.getAllGroups()

    expect(response).toStrictEqual([mockGroup])
    expect(groupRepo.getAllGroups).toHaveBeenCalledTimes(1)
  })
})
