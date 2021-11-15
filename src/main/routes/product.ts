import {
  makeCreateProductController,
  makeUpdateProductController,
  makeGetProductsController,
  makeGetProductByCodeController,
  makeGetProductsByGroupCodeController
} from '@/main/factories/controllers/product'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/products', async (req, res) => makeGetProductsController().handle(req, res))
  router.get('/products/:code', async (req, res) => makeGetProductByCodeController().handle(req, res))
  router.post('/products', async (req, res) => makeCreateProductController().handle(req, res))
  router.put('/products/:code', async (req, res) => makeUpdateProductController().handle(req, res))
  router.get('/products/groups/:group_code', async (req, res) => makeGetProductsByGroupCodeController().handle(req, res))
}
