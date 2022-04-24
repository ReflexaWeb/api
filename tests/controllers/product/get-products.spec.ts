import { GetProductsController } from '@/controllers/product'
import { GetAllProduct } from '@/domain/contracts/repos'
import { mockProductsResponse } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'

describe('GetProductsController', () => {
  let productRepo: MockProxy<GetAllProduct>
  let req: Request
  let res: Response
  let sut: GetProductsController

  beforeAll(() => {
    productRepo = mock()
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
    req.query = {}

    productRepo.getAllProducts.mockResolvedValue(mockProductsResponse)
  })

  afterEach(() => {

  })

  beforeEach(() => {
    sut = new GetProductsController(productRepo)
  })

  it('should return 200 with data', async () => {
    await sut.handle(req, res)

    expect(productRepo.getAllProducts).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenNthCalledWith(1, mockProductsResponse)
    expect(res.status).toHaveBeenNthCalledWith(1, 200)
  })

  it('should return 200 with data and filters', async () => {
    req.query = { name: 'any_name', group_code: '001' }

    await sut.handle(req, res)

    expect(productRepo.getAllProducts).toHaveBeenNthCalledWith(1, req.query)
    expect(res.json).toHaveBeenNthCalledWith(1, mockProductsResponse)
    expect(res.status).toHaveBeenNthCalledWith(1, 200)
  })

  it('should return 200 without data', async () => {
    const mockProductsResponseWithNoData = {
      ...mockProductsResponse,
      data: []
    }
    productRepo.getAllProducts.mockResolvedValueOnce(mockProductsResponseWithNoData)

    await sut.handle(req, res)

    expect(productRepo.getAllProducts).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenNthCalledWith(1, mockProductsResponseWithNoData)
    expect(res.status).toHaveBeenNthCalledWith(1, 200)
  })

  it('should return 500', async () => {
    const error = new Error('some error')
    productRepo.getAllProducts.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.getAllProducts).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenNthCalledWith(1, 500)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
  })
})
