import { GetAllProduct, ProductQuantity } from '@/domain/contracts/repos'
import { GetProductsUsecase } from '@/domain/usecases'
import { productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetProductsUsecase', () => {
  let productRepo: MockProxy<GetAllProduct & ProductQuantity>
  let sut: GetProductsUsecase

  beforeAll(() => {
    productRepo = mock()
  })

  beforeEach(() => {
    sut = new GetProductsUsecase(productRepo)
  })

  it('should be able return all products', async () => {
    productRepo.getAll.mockResolvedValue([productData])

    await sut.getAll()

    expect(productRepo.getAll).toHaveBeenCalled()
  })

  it('should be able return all products cached', async () => {
    productRepo.getAll.mockResolvedValue([])
    productRepo.quantity.mockResolvedValue(0)

    await sut.getAll()

    expect(productRepo.getAll).toHaveBeenCalledTimes(1)
  })

  it('should be able return revalidated products cached', async () => {
    productRepo.getAll.mockResolvedValue([])
    productRepo.quantity.mockResolvedValue(0)

    const firstCall = await sut.getAll()
    expect(firstCall).toEqual([])

    productRepo.getAll.mockResolvedValue([productData])
    productRepo.quantity.mockResolvedValue(1)
    const secondCall = await sut.getAll()

    expect(secondCall).toEqual([{ ...productData }])
    expect(productRepo.getAll).toHaveBeenCalledTimes(2)
  })
})
