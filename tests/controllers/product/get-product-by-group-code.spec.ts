import { GetProductsByGroupCodeController } from '@/controllers/product'
import { GetProductsByGroupCode } from '@/domain/contracts/repos'
import { productCollection, productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'
import { RequestError } from '@/errors'

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

    productRepo.getProductsByGroupCode.mockResolvedValue(productCollection)
  })

  beforeEach(() => {

  })

  beforeEach(() => {
    sut = new GetProductsByGroupCodeController(productRepo)
    req.params = { group_code: productData.group_code }
  })

  it('should return 200 with data', async () => {
    await sut.handle(req, res)

    expect(productRepo.getProductsByGroupCode).toHaveBeenNthCalledWith(1, req.params.group_code)
    expect(res.json).toHaveBeenNthCalledWith(1, productCollection)
    expect(res.status).toHaveBeenNthCalledWith(1, 200)
  })

  it('should return 200 with no data', async () => {
    productRepo.getProductsByGroupCode.mockResolvedValue([])

    await sut.handle(req, res)

    expect(productRepo.getProductsByGroupCode).toHaveBeenNthCalledWith(1, req.params.group_code)
    expect(res.json).toHaveBeenNthCalledWith(1, [])
    expect(res.status).toHaveBeenNthCalledWith(1, 200)
  })

  it('should return 400', async () => {
    const error = new RequestError('some error')
    productRepo.getProductsByGroupCode.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.getProductsByGroupCode).toHaveBeenNthCalledWith(1, req.params.group_code)
    expect(res.status).toHaveBeenNthCalledWith(1, 400)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
  })

  it('should return 500', async () => {
    const error = new Error('some error')
    productRepo.getProductsByGroupCode.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.getProductsByGroupCode).toHaveBeenNthCalledWith(1, req.params.group_code)
    expect(res.status).toHaveBeenNthCalledWith(1, 500)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
  })
})
