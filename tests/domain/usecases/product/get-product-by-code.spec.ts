import { productData } from '@/../tests/domain/mocks'
import { GetProductByCode } from '@/domain/contracts/repos'
import { GetProductByCodeUsecase } from '@/domain/usecases/product'
import { RequestError } from '@/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetProductByCodeUsecase', () => {
  let productRepo: MockProxy<GetProductByCode>
  let sut: GetProductByCodeUsecase
  const productCode = 'any_product_code'

  beforeAll(() => {
    productRepo = mock()
    productRepo.getProductByCode.mockResolvedValue(productData)
  })

  beforeEach(() => {
    sut = new GetProductByCodeUsecase(productRepo)
  })

  it('should return an specific product by code', async () => {
    await sut.getProductByCode(productCode)

    expect(productRepo.getProductByCode).toHaveBeenNthCalledWith(1, productCode)
  })

  it('should return empty if no product were found by provided code', async () => {
    const productNotFound = new RequestError(`Produto de código [${productCode}] não foi encontrado.`)
    productRepo.getProductByCode.mockResolvedValueOnce(null)

    await expect(sut.getProductByCode(productCode)).rejects.toThrow(productNotFound)

    expect(productRepo.getProductByCode).toHaveBeenNthCalledWith(1, productCode)
  })
})
