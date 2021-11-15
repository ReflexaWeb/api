import { GetProductsController } from '@/controllers/product'
import { GetAllProduct } from '@/domain/contracts/repos'
import { productData } from '@/tests/domain/mocks'

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

    productRepo.getAll.mockResolvedValue([productData])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    sut = new GetProductsController(productRepo)
  })

  it('should return 200 with data', async () => {
    await sut.handle(req, res)

    expect(productRepo.getAll).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith([productData])
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return 200 without data', async () => {
    productRepo.getAll.mockResolvedValueOnce([])

    await sut.handle(req, res)

    expect(productRepo.getAll).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith([])
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return 500', async () => {
    const error = new Error('some error')
    productRepo.getAll.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(productRepo.getAll).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: error })
  })
})
