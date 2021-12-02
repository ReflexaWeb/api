import { UpdateGroupController } from '@/controllers/group'
import { GetGroupByCode, UpdateGroup } from '@/domain/contracts/repos'
import { groupData } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'
import { GroupNotFound } from '@/errors'

describe('UpdateGroupController', () => {
  let groupRepo: MockProxy<UpdateGroup & GetGroupByCode>
  let req: Request
  let res: Response
  let sut: UpdateGroupController

  beforeAll(() => {
    groupRepo = mock()
    req = mock()
    res = mock()

    res.sendStatus = jest.fn().mockReturnThis()
    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  afterEach(() => {
    jest.clearAllMocks()

    req.body = {}
    req.params = {}
  })

  beforeEach(() => {
    sut = new UpdateGroupController(groupRepo)

    req.body = { ...groupData }
    req.params = { code: groupData.code }
  })

  it('should return 200', async () => {
    await sut.handle(req, res)

    expect(groupRepo.update).toHaveBeenNthCalledWith(1, req.params.code, { ...req.body })
    expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
  })

  it('should return 422', async () => {
    const mockThrownError = new GroupNotFound('some error')
    groupRepo.update.mockRejectedValueOnce(mockThrownError)

    await sut.handle(req, res)

    expect(groupRepo.update).toHaveBeenNthCalledWith(1, req.params.code, { ...req.body })
    expect(res.status).toHaveBeenNthCalledWith(1, 422)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: mockThrownError.message })
  })

  it('should return 500', async () => {
    const mockThrownError = new Error('some error')
    groupRepo.update.mockRejectedValueOnce(mockThrownError)

    await sut.handle(req, res)

    expect(groupRepo.update).toHaveBeenNthCalledWith(1, req.params.code, { ...req.body })
    expect(res.status).toHaveBeenNthCalledWith(1, 500)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: mockThrownError })
  })
})
