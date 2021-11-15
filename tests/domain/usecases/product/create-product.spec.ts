import { CreateProduct, GetGroupByCode, GetProductByCode } from '@/domain/contracts/repos'
import { CreateProductUsecase } from '@/domain/usecases/product'
import { GroupNotFound, ProductFound, RequiredFieldError } from '@/errors'
import { groupData, productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateProductUsecase', () => {
  let productRepo: MockProxy<CreateProduct & GetProductByCode>
  let groupRepo: MockProxy<GetGroupByCode>
  let sut: CreateProductUsecase

  beforeAll(() => {
    productRepo = mock()
    groupRepo = mock()
  })

  beforeEach(() => {
    jest.resetAllMocks()
    sut = new CreateProductUsecase(productRepo, groupRepo)
  })

  it('should be able to create a new product with all data', async () => {
    productRepo.getProductByCode.mockResolvedValue(undefined)
    groupRepo.getGroupByCode.mockResolvedValue(groupData)

    await sut.create(productData)

    expect(productRepo.create).toHaveBeenCalledWith({ ...productData })
    expect(productRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should not be able to create a new product if given group code not exists', async () => {
    productRepo.getProductByCode.mockResolvedValue(undefined)
    groupRepo.getGroupByCode.mockResolvedValue(undefined)
    const error = new GroupNotFound(`Grupo de código ${productData.group_code} não encontrado.`)

    const promise = sut.create(productData)

    await expect(promise).rejects.toThrow(error)
  })

  it('should not be able to create a new product if given code already exists', async () => {
    productRepo.getProductByCode.mockResolvedValue(productData)
    const error = new ProductFound(`Produto de código ${productData.code} encontrado.`)
    productRepo.create.mockRejectedValueOnce(error)

    const promise = sut.create(productData)

    await expect(promise).rejects.toThrow(error)
  })

  it('should not be able to create a new product if invalid reference were provided', async () => {
    const errorsThatShouldBeGenerated = ['O campo [REFERENCE] é obrigatório.']
    const error = new RequiredFieldError(errorsThatShouldBeGenerated)
    productRepo.create.mockRejectedValueOnce(error)

    const invalidProductData = { ...productData, reference: '' }

    await expect(sut.create(invalidProductData)).rejects.toStrictEqual(error)
  })

  it('should not be able to create a new product if invalid name were provided', async () => {
    const errorsThatShouldBeGenerated = ['O campo [NAME] é obrigatório.']
    const error = new RequiredFieldError(errorsThatShouldBeGenerated)
    productRepo.create.mockRejectedValueOnce(error)

    const invalidProductData = { ...productData, name: '' }

    await expect(sut.create(invalidProductData)).rejects.toStrictEqual(error)
  })

  it('should not be able to create a new product if invalid code were provided', async () => {
    const errorsThatShouldBeGenerated = ['O campo [CODE] é obrigatório.']
    const error = new RequiredFieldError(errorsThatShouldBeGenerated)
    productRepo.create.mockRejectedValueOnce(error)

    const invalidProductData = { ...productData, code: '' }

    await expect(sut.create(invalidProductData)).rejects.toStrictEqual(error)
  })

  it('should not be able to create a new product if invalid code and name were provided', async () => {
    const errorsThatShouldBeGenerated = ['O campo [NAME] é obrigatório.', 'O campo [CODE] é obrigatório.']
    const error = new RequiredFieldError(errorsThatShouldBeGenerated)
    productRepo.create.mockRejectedValueOnce(error)

    const invalidProductData = { ...productData, code: '', name: '' }

    await expect(sut.create(invalidProductData)).rejects.toStrictEqual(error)
  })
})