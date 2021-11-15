import { GetGroupsController } from '@/controllers/group'
import { GetAllGroup } from '@/domain/contracts/repos'
import { productData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'

describe('GetGroupsController', () => {
  let groupRepo: MockProxy<GetAllGroup>
  let req: Request
  let res: Response
  let sut: GetGroupsController

  beforeAll(() => {
    groupRepo = mock()
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()

    groupRepo.getAllGroups.mockResolvedValue([productData])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    sut = new GetGroupsController(groupRepo)
  })

  it('should return 200 with data', async () => {
    await sut.handle(req, res)

    expect(groupRepo.getAllGroups).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith([productData])
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return 200 without data', async () => {
    groupRepo.getAllGroups.mockResolvedValueOnce([])

    await sut.handle(req, res)

    expect(groupRepo.getAllGroups).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith([])
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return 500', async () => {
    const error = new Error('some error')
    groupRepo.getAllGroups.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(groupRepo.getAllGroups).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: error })
  })
})
