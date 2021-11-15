import { GetProductByCodeController } from '@/controllers'
import { GetProductByCode } from '@/domain/contracts/repos'
import { productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'
import { DataNotFound } from '@/errors'

describe('GetProductByCodeController', () => {
  let productRepo: MockProxy<GetProductByCode>
  let req: Request
  let res: Response
  let sut: GetProductByCodeController

  beforeAll(() => {
    productRepo = mock()
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()

    productRepo.getProductByCode.mockResolvedValue(productData)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    sut = new GetProductByCodeController(productRepo)
    req.params = { code: 'any_code' }
  })

  it('should return 200 with data', async () => {
    await sut.handle(req, res)

    expect(productRepo.getProductByCode).toHaveBeenCalledWith(req.params.code)
    expect(res.json).toHaveBeenCalledWith(productData)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return 400', async () => {
    const error = new DataNotFound('some error')
    productRepo.getProductByCode.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.getProductByCode).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: error.message })
  })

  it('should return 500', async () => {
    const error = new Error('some error')
    productRepo.getProductByCode.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.getProductByCode).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: error })
  })
})
