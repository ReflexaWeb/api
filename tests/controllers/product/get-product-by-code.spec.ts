import { GetProductByCodeController } from '@/controllers/product'
import { GetProductByCode } from '@/domain/contracts/repos'
import { productData } from '@/tests/domain/mocks'
import { RequestError } from '@/errors'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'

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

  })

  beforeEach(() => {
    sut = new GetProductByCodeController(productRepo)
    req.params = { code: 'any_code' }
  })

  it('should return 200 with data', async () => {
    await sut.handle(req, res)

    expect(productRepo.getProductByCode).toHaveBeenNthCalledWith(1, req.params.code)
    expect(res.json).toHaveBeenNthCalledWith(1, productData)
    expect(res.status).toHaveBeenNthCalledWith(1, 200)
  })

  it('should return 400', async () => {
    const error = new RequestError('some error')
    productRepo.getProductByCode.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.getProductByCode).toHaveBeenNthCalledWith(1, req.params.code)
    expect(res.status).toHaveBeenNthCalledWith(1, 400)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
  })

  it('should return 500', async () => {
    const error = new Error('some error')
    productRepo.getProductByCode.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.getProductByCode).toHaveBeenNthCalledWith(1, req.params.code)
    expect(res.status).toHaveBeenNthCalledWith(1, 500)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
  })
})
