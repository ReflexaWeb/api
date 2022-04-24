import { UpdateProductController } from '@/controllers/product'
import { GetProductByCode, UpdateProduct } from '@/domain/contracts/repos'
import { productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'
import { RequestError } from '@/errors'

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

    expect(productUsecase.update).toHaveBeenNthCalledWith(1, req.params.code, req.body)
    expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
  })

  it('should return 422', async () => {
    const error = new RequestError('some error')
    productUsecase.update.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productUsecase.update).toHaveBeenNthCalledWith(1, req.params.code, req.body)
    expect(res.status).toHaveBeenNthCalledWith(1, 422)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
  })

  it('should return 500', async () => {
    const error = new Error('some error')
    productUsecase.update.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productUsecase.update).toHaveBeenNthCalledWith(1, req.params.code, req.body)
    expect(res.status).toHaveBeenNthCalledWith(1, 500)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
  })
})
