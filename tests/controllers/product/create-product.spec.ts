import { CreateProductController } from '@/controllers/product'
import { CreateProduct, GetProductByCode } from '@/domain/contracts/repos'
import { RequestError, RequiredFieldError } from '@/errors'
import { productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'

describe('CreateProductController', () => {
  let productRepo: MockProxy<CreateProduct & GetProductByCode>
  let req: Request
  let res: Response
  let sut: CreateProductController

  beforeAll(() => {
    productRepo = mock()
    req = mock()
    res = mock()

    res.sendStatus = jest.fn().mockReturnThis()
    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  afterEach(() => {
    req.body = {}
  })

  beforeEach(() => {
    sut = new CreateProductController(productRepo)
    req.body = { ...productData }
  })

  it('should return 201', async () => {
    await sut.handle(req, res)

    expect(productRepo.create).toHaveBeenNthCalledWith(1, req.body)
    expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
  })

  it('should return 422', async () => {
    const error = new RequestError('some error')
    productRepo.create.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.create).toHaveBeenNthCalledWith(1, productData)
    expect(res.status).toHaveBeenNthCalledWith(1, 422)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
  })

  it('should return 400', async () => {
    const error = new RequiredFieldError(['some error'])
    productRepo.create.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.create).toHaveBeenNthCalledWith(1, productData)
    expect(res.status).toHaveBeenNthCalledWith(1, 400)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error.errors })
  })

  it('should return 500', async () => {
    const error = new Error('some error')
    productRepo.create.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.create).toHaveBeenNthCalledWith(1, productData)
    expect(res.status).toHaveBeenNthCalledWith(1, 500)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
  })
})
