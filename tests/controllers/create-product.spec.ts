import { CreateProductController } from '@/controllers'
import { CreateProduct, GetProductByCode } from '@/domain/contracts/repos'
import { ProductFound, RequiredFieldError } from '@/errors'
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
    jest.clearAllMocks()

    req.body = {}
  })

  beforeEach(() => {
    sut = new CreateProductController(productRepo)

    req.body = { ...productData }
  })

  it('should return 201', async () => {
    await sut.handle(req, res)

    expect(productRepo.create).toHaveBeenCalledWith({ ...req.body })
    expect(res.sendStatus).toHaveBeenCalledWith(201)
  })

  it('should return 422', async () => {
    const mockThrownError = new ProductFound('some error')
    productRepo.create.mockRejectedValueOnce(mockThrownError)

    await sut.handle(req, res)

    expect(productRepo.create).toHaveBeenCalledWith(productData)
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith({ message: mockThrownError.message })
  })

  it('should return 400', async () => {
    const mockThrownError = new RequiredFieldError('some error')
    productRepo.create.mockRejectedValueOnce(mockThrownError)

    await sut.handle(req, res)

    expect(productRepo.create).toHaveBeenCalledWith(productData)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: mockThrownError.message })
  })

  it('should return 500', async () => {
    const mockThrownError = new Error('some error')
    productRepo.create.mockRejectedValueOnce(mockThrownError)

    await sut.handle(req, res)

    expect(productRepo.create).toHaveBeenCalledWith(productData)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: mockThrownError })
  })
})
