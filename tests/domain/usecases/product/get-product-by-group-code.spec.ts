import { productData } from '@/../tests/domain/mocks'
import { GetProductsByGroupCode } from '@/domain/contracts/repos'
import { GetProductsByGroupCodeUsecase } from '@/domain/usecases/product'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetProductsByGroupCodeUseCase', () => {
  let productRepo: MockProxy<GetProductsByGroupCode>
  let sut: GetProductsByGroupCodeUsecase

  beforeAll(() => {
    productRepo = mock()
  })

  beforeEach(() => {
    sut = new GetProductsByGroupCodeUsecase(productRepo)
  })

  it('should return products by given group code', async () => {
    productRepo.getProductsByGroupCode.mockResolvedValue([productData])

    const response = await sut.getProductsByGroupCode(productData.group_code)

    expect(response).toHaveLength(1)
    expect(response).toEqual([{ ...productData }])
    expect(productRepo.getProductsByGroupCode).toHaveBeenNthCalledWith(1, productData.group_code)
  })

  it('should return an empty list if no products were found by given group code', async () => {
    productRepo.getProductsByGroupCode.mockResolvedValue([])

    const response = await sut.getProductsByGroupCode(productData.group_code)

    expect(response).toHaveLength(0)
    expect(response).toEqual([])
    expect(productRepo.getProductsByGroupCode).toHaveBeenNthCalledWith(1, productData.group_code)
  })
})
