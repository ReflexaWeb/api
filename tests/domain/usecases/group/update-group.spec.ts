import { GetGroupByCode, GetProductsByGroupCode, UpdateGroup, UpdateProduct } from '@/domain/contracts/repos'
import { UpdateGroupUsecase } from '@/domain/usecases/group'
import { RequestError } from '@/errors'
import { mockGroup, productCollection } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateGroupUsecase', () => {
  let groupRepo: MockProxy<UpdateGroup & GetGroupByCode>
  let productRepo: MockProxy<UpdateProduct & GetProductsByGroupCode>
  let sut: UpdateGroupUsecase

  beforeAll(() => {
    groupRepo = mock()
    productRepo = mock()
    groupRepo.getGroupByCode.mockResolvedValue(mockGroup)
    productRepo.getProductsByGroupCode.mockResolvedValue(productCollection)
  })

  beforeEach(() => {
    sut = new UpdateGroupUsecase(groupRepo, productRepo)
  })

  it('should be able to update an existing group', async () => {
    await sut.update(mockGroup.code, mockGroup)

    expect(groupRepo.update).toHaveBeenNthCalledWith(1, mockGroup.code, mockGroup)
  })

  it('should return 422 if not group was found', async () => {
    const error = new RequestError(`Grupo de código [${mockGroup.code}] não encontrado.`)
    groupRepo.getGroupByCode.mockResolvedValueOnce(null)

    const promise = sut.update(mockGroup.code, mockGroup)

    await expect(promise).rejects.toThrow(error)
  })
})
