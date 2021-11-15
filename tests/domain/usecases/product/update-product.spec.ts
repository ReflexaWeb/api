import { GetProductByCode, UpdateProduct } from '@/domain/contracts/repos'
import { UpdateProductUsecase } from '@/domain/usecases/product'
import { ProductNotFound } from '@/errors'
import { productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateProductUsecase', () => {
  let productRepo: MockProxy<UpdateProduct & GetProductByCode>
  let sut: UpdateProductUsecase

  beforeAll(() => {
    productRepo = mock()
    productRepo.getProductByCode.mockResolvedValue(productData)
  })

  beforeEach(() => {
    sut = new UpdateProductUsecase(productRepo)
  })

  it('should be able to update an existing product', async () => {
    await sut.update(productData.code, productData)

    expect(productRepo.update).toHaveBeenCalledWith(productData.code, { ...productData })
  })

  it('should return 422 if not product was found', async () => {
    const mockThrownError = new ProductNotFound(`Produto de código ${productData.code} não encontrado.`)
    productRepo.getProductByCode.mockResolvedValueOnce(undefined)

    await expect(sut.update(productData.code, productData)).rejects.toThrow(mockThrownError)

    expect(productRepo.getProductByCode).toHaveBeenCalledWith(productData.code)
  })
})
