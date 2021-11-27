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

  it('should be able return all products', async () => {
    productRepo.getAllProducts.mockResolvedValue(mockProductsResponse)

    await sut.getAllProducts()

    expect(productRepo.getAllProducts).toHaveBeenCalledTimes(1)
  })

  it('should be able return products with filters', async () => {
    productRepo.getAllProducts.mockResolvedValue(mockProductsResponse)
    const filters = { active: true, name: 'any_name' }

    const response = await sut.getAllProducts(filters)

    expect(response).toStrictEqual(mockProductsResponse)
    expect(productRepo.getAllProducts).toHaveBeenNthCalledWith(1, filters)
  })
})
