import { GetAllProduct } from '@/domain/contracts/repos'
import { GetProductsUsecase } from '@/domain/usecases/product'
import { mockProductsResponse } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetProductsUsecase', () => {
  let productRepo: MockProxy<GetAllProduct>
  let sut: GetProductsUsecase

  beforeAll(() => {
    productRepo = mock()
  })

  beforeEach(() => {
    sut = new GetProductsUsecase(productRepo)
  })

  it('should be able return all products with no filters', async () => {
    productRepo.getAllProducts.mockResolvedValue(mockProductsResponse)

    const response = await sut.getAllProducts()

    expect(response).toStrictEqual(mockProductsResponse)
    expect(productRepo.getAllProducts).toHaveBeenCalledTimes(1)
  })

  it('should be able return products with filters', async () => {
    productRepo.getAllProducts.mockResolvedValue(mockProductsResponse)
    const filters = { name: 'any_name', group_code: '001' }

    const response = await sut.getAllProducts(filters)

    expect(response).toStrictEqual(mockProductsResponse)
    expect(productRepo.getAllProducts).toHaveBeenNthCalledWith(1, filters)
  })
})
