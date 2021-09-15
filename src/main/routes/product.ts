import { makeGetProductsController, makeCreateProductController, makeUpdateProductController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/products', async (req, res) => makeGetProductsController().handle(req, res))
  router.post('/products', async (req, res) => makeCreateProductController().handle(req, res))
  router.put('/products/:code', async (req, res) => makeUpdateProductController().handle(req, res))
}
