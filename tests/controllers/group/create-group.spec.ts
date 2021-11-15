import { CreateGroupController } from '@/controllers/group'
import { CreateGroup, GetGroupByCode } from '@/domain/contracts/repos'
import { GroupFound, RequiredFieldError } from '@/errors'
import { groupData } from '@/tests/domain/mocks'

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
    jest.clearAllMocks()

    req.body = {}
  })

  beforeEach(() => {
    sut = new CreateGroupController(groupRepo)

    req.body = { ...groupData }
  })

  it('should return 201', async () => {
    await sut.handle(req, res)

    expect(groupRepo.create).toHaveBeenCalledWith({ ...req.body })
    expect(res.sendStatus).toHaveBeenCalledWith(201)
  })

  it('should return 422', async () => {
    const mockThrownError = new GroupFound('some error')
    groupRepo.create.mockRejectedValueOnce(mockThrownError)

    await sut.handle(req, res)

    expect(groupRepo.create).toHaveBeenCalledWith(groupData)
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith({ message: mockThrownError.message })
  })

  it('should return 400', async () => {
    const mockThrownError = new RequiredFieldError(['some error'])
    groupRepo.create.mockRejectedValueOnce(mockThrownError)

    await sut.handle(req, res)

    expect(groupRepo.create).toHaveBeenCalledWith(groupData)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: mockThrownError.errors })
  })

  it('should return 500', async () => {
    const mockThrownError = new Error('some error')
    groupRepo.create.mockRejectedValueOnce(mockThrownError)

    await sut.handle(req, res)

    expect(groupRepo.create).toHaveBeenCalledWith(groupData)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: mockThrownError })
  })
})
