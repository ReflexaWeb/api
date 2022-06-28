import { CreateGroupController } from '@/controllers/group'
import { CreateGroup, GetGroupByCode } from '@/domain/contracts/repos'
import { RequestError, RequiredFieldError } from '@/errors'
import { mockGroup } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'
import { Request, Response } from 'express'

describe('CreateGroupController', () => {
  let groupRepo: MockProxy<CreateGroup & GetGroupByCode>
  let req: Request
  let res: Response
  let sut: CreateGroupController

  beforeAll(() => {
    groupRepo = mock()
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
    sut = new CreateGroupController(groupRepo)
    req.body = { ...mockGroup }
  })

  it('should return 201', async () => {
    await sut.handle(req, res)

    expect(groupRepo.create).toHaveBeenNthCalledWith(1, req.body)
    expect(res.sendStatus).toHaveBeenNthCalledWith(1, 201)
  })

  it('should return 422', async () => {
    const error = new RequestError('some error')
    groupRepo.create.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(groupRepo.create).toHaveBeenNthCalledWith(1, mockGroup)
    expect(res.status).toHaveBeenNthCalledWith(1, 422)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
  })

  it('should return 400', async () => {
    const error = new RequiredFieldError(['some error'])
    groupRepo.create.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(groupRepo.create).toHaveBeenNthCalledWith(1, mockGroup)
    expect(res.status).toHaveBeenNthCalledWith(1, 400)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error.errors })
  })

  it('should return 500', async () => {
    const error = new Error('some error')
    groupRepo.create.mockRejectedValueOnce(error)

    await sut.handle(req, res)

    expect(groupRepo.create).toHaveBeenNthCalledWith(1, mockGroup)
    expect(res.status).toHaveBeenNthCalledWith(1, 500)
    expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
  })
})
