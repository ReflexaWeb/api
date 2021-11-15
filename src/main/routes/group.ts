import { makeCreateGroupController, makeGetGroupsController, makeUpdateGroupController } from '@/main/factories/controllers/group'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/groups', async (req, res) => makeGetGroupsController().handle(req, res))
  router.post('/groups', async (req, res) => makeCreateGroupController().handle(req, res))
  router.put('/groups/:code', async (req, res) => makeUpdateGroupController().handle(req, res))
}
