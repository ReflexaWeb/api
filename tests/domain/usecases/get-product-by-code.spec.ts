import { productData } from '@/../tests/domain/mocks'
import { GetProductByCode } from '@/domain/contracts/repos'
import { GetProductByCodeUsecase } from '@/domain/usecases'
import { ProductNotFound } from '@/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetProductByCodeUsecase', () => {
  let productRepo: MockProxy<GetProductByCode>
  let sut: GetProductByCodeUsecase

  beforeAll(() => {
    productRepo = mock()
    productRepo.getProductByCode.mockResolvedValue(productData)
  })

  beforeEach(() => {
    sut = new GetProductByCodeUsecase(productRepo)
  })

  it('should return an specific product by code', async () => {
    await sut.getProductByCode('any_product_code')

    expect(productRepo.getProductByCode).toHaveBeenCalledTimes(1)
    expect(productRepo.getProductByCode).toHaveBeenCalledWith('any_product_code')
  })

  it('should return empty if no product were found by provided code', async () => {
    const productNotFound = new ProductNotFound('Produto de código [any_product_code] não foi encontrado.')
    productRepo.getProductByCode.mockResolvedValueOnce(undefined)

    await expect(sut.getProductByCode('any_product_code')).rejects.toThrow(productNotFound)

    expect(productRepo.getProductByCode).toHaveBeenCalledTimes(1)
    expect(productRepo.getProductByCode).toHaveBeenCalledWith('any_product_code')
  })
})
