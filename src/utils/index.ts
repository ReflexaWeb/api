/* eslint-disable @typescript-eslint/method-signature-style */
import { NextFunction, Response, Request } from 'express'
import { PaginationAwareObject, paginate } from './paginate'
import { SelectQueryBuilder } from 'typeorm'

declare module 'typeorm' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface SelectQueryBuilder<Entity> {
    paginate(per_page?: number | null): Promise<PaginationAwareObject>
  }
}

/**
 * Boot the package by patching the SelectQueryBuilder
 *
 */
export function pagination (req: Request, _: Response, next: NextFunction): void {
  SelectQueryBuilder.prototype.paginate = async function (per_page?: number | undefined): Promise<PaginationAwareObject> {
    const current_page = getPage(req)
    per_page = per_page ?? getPerPage(req)
    return await paginate(this, per_page, current_page)
  }
  next()
}

export function getPerPage (req: Request, defaultPerPage: number = 15): number {
  return parseInt(req.query.per_page as string) || defaultPerPage
}

export function getPage (req: Request, defaultPage: number = 1): number {
  return parseInt(req.query.page as string) || defaultPage
}
