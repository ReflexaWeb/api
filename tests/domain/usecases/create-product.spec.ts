import { CreateProduct, GetProductByCode } from '@/domain/contracts/repos'
import { CreateProductUsecase } from '@/domain/usecases'
import { ProductFound, RequiredFieldError } from '@/errors'
import { productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateProductUsecase', () => {
  let productRepo: MockProxy<CreateProduct & GetProductByCode>
  let sut: CreateProductUsecase

  beforeAll(() => {
    productRepo = mock()
    productRepo.getByCode.mockResolvedValue(productData)
  })

  beforeEach(() => {
    sut = new CreateProductUsecase(productRepo)
  })

  it('should be able to create a new product with all data', async () => {
    productRepo.getByCode.mockResolvedValueOnce(undefined)

    await sut.create(productData)

    expect(productRepo.create).toHaveBeenCalledWith({ ...productData })
    expect(productRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should not be able to create a new product if given code already exists', async () => {
    const error = new ProductFound(`Produto de código ${productData.code} encontrado.`)
    productRepo.create.mockRejectedValueOnce(error)

    const promise = sut.create(productData)

    await expect(promise).rejects.toThrow(error)
  })

  it('should not be able to create a new product if invalid name were provided', async () => {
    const error = new RequiredFieldError('O campo [NAME] é obrigatório.')
    productRepo.create.mockRejectedValueOnce(error)

    const invalidProductData = { ...productData, name: '' }

    const promise = sut.create(invalidProductData)

    await expect(promise).rejects.toThrow(error)
  })

  it('should not be able to create a new product if invalid code were provided', async () => {
    const error = new RequiredFieldError('O campo [CODE] é obrigatório.')
    productRepo.create.mockRejectedValueOnce(error)

    const invalidProductData = { ...productData, code: '' }

    const promise = sut.create(invalidProductData)

    await expect(promise).rejects.toThrow(error)
  })
})
