import { GetProductsByGroupCodeController } from '@/controllers/product'
import { GetProductsByGroupCode } from '@/domain/contracts/repos'
import { productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'
import { DataNotFound } from '@/errors'

describe('GetProductByGroupCodeController', () => {
  let productRepo: MockProxy<GetProductsByGroupCode>
  let req: Request
  let res: Response
  let sut: GetProductsByGroupCodeController

  beforeAll(() => {
    productRepo = mock()
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()

    productRepo.getProductsByGroupCode.mockResolvedValue([productData])
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    sut = new GetProductsByGroupCodeController(productRepo)
    req.params = { group_code: productData.group_code }
  })

  it('should return 200 with data', async () => {
    await sut.handle(req, res)

    expect(productRepo.getProductsByGroupCode).toHaveBeenNthCalledWith(1, req.params.group_code)
    expect(res.json).toHaveBeenNthCalledWith(1, [productData])
    expect(res.status).toHaveBeenNthCalledWith(1, 200)
  })

  it('should return 400', async () => {
    const error = new DataNotFound('some error')
    productRepo.getProductsByGroupCode.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.getProductsByGroupCode).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenNthCalledWith(1, 400)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
  })

  it('should return 500', async () => {
    const error = new Error('some error')
    productRepo.getProductsByGroupCode.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.getProductsByGroupCode).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenNthCalledWith(1, 500)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
  })
})
