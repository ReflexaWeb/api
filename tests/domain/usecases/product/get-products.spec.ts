import { GetAllProduct } from '@/domain/contracts/repos'
import { GetProductsUsecase } from '@/domain/usecases/product'
import { productDataCollection } from '@/tests/domain/mocks'

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
    productRepo.getAll.mockResolvedValue(productDataCollection)

    await sut.getAll()

    expect(productRepo.getAll).toHaveBeenCalled()
  })

  it('should be able return all active products', async () => {
    productRepo.getAll.mockResolvedValue([productDataCollection[0]])
    const filters = { active: true }

    const activeProducts = await sut.getAll(filters)

    expect(activeProducts).toEqual([
      { ...productDataCollection[0] }
    ])
    expect(productRepo.getAll).toHaveBeenNthCalledWith(1, filters)
  })

  it('should be able return all inactive products', async () => {
    productRepo.getAll.mockResolvedValue([productDataCollection[1]])
    const filters = { active: false }

    const inactiveProducts = await sut.getAll(filters)

    expect(inactiveProducts).toEqual([
      { ...productDataCollection[1] }
    ])
    expect(productRepo.getAll).toHaveBeenNthCalledWith(1, filters)
  })
})
