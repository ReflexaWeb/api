import { UpdateProductController } from '@/controllers/product'
import { GetProductByCode, UpdateProduct } from '@/domain/contracts/repos'
import { productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'
import { ProductNotFound } from '@/errors'

describe('UpdateProductController', () => {
  let productUsecase: MockProxy<UpdateProduct & GetProductByCode>
  let req: Request
  let res: Response
  let sut: UpdateProductController

  beforeAll(() => {
    productUsecase = mock()
    req = mock()
    res = mock()

    res.sendStatus = jest.fn().mockReturnThis()
    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  afterEach(() => {
    jest.clearAllMocks()

    req.body = {}
    req.params = {}
  })

  beforeEach(() => {
    sut = new UpdateProductController(productUsecase)

    req.body = { ...productData }
    req.params = { code: productData.code }
  })

  it('should return 200', async () => {
    await sut.handle(req, res)

    expect(productUsecase.update).toHaveBeenCalledWith(req.params.code, { ...req.body })
    expect(res.sendStatus).toHaveBeenCalledWith(200)
  })

  it('should return 422', async () => {
    const mockThrownError = new ProductNotFound('some error')
    productUsecase.update.mockRejectedValueOnce(mockThrownError)

    await sut.handle(req, res)

    expect(productUsecase.update).toHaveBeenCalledWith(req.params.code, { ...req.body })
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith({ message: mockThrownError.message })
  })

  it('should return 500', async () => {
    const mockThrownError = new Error('some error')
    productUsecase.update.mockRejectedValueOnce(mockThrownError)

    await sut.handle(req, res)

    expect(productUsecase.update).toHaveBeenCalledWith(req.params.code, { ...req.body })
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: mockThrownError })
  })
})
