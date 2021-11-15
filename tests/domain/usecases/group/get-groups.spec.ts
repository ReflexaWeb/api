import { GetAllGroup } from '@/domain/contracts/repos'
import { GetGroupsUsecase } from '@/domain/usecases/group'
import { groupData } from '@/tests/domain/mocks'

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

  it('should be able return all Groups', async () => {
    groupRepo.getAllGroups.mockResolvedValue([groupData])

    await sut.getAllGroups()

    expect(groupRepo.getAllGroups).toHaveBeenCalled()
  })
})
