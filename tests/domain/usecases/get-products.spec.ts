import { GetAllProduct } from '@/domain/contracts/repos'
import { GetProductsUsecase } from '@/domain/usecases'
import { productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetProductsUsecase', () => {
  let productRepo: MockProxy<GetAllProduct>
  let sut: GetProductsUsecase

  it('should be able return all products', async () => {
    productRepo = mock()
    productRepo.getAll.mockResolvedValue([productData])

    sut = new GetProductsUsecase(productRepo)

    await sut.getAll()

    expect(productRepo.getAll).toHaveBeenCalled()
  })
})
