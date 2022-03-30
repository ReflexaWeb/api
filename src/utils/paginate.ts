import { SelectQueryBuilder } from 'typeorm'

export const paginate = async function (builder: SelectQueryBuilder<any>, per_page: number, page: number): Promise<PaginationAwareObject> {
  const skip = (page - 1) * per_page
  const total = await builder.getCount()
  const calcule_last_page = total % per_page
  const last_page = calcule_last_page === 0 ? total / per_page : Math.trunc(total / per_page) + 1
  const data = await builder
    .skip(skip)
    .take(per_page)
    .getMany()

  return {
    from: skip <= total ? skip + 1 : null,
    to: (total > skip + per_page) ? skip + per_page : total,
    per_page,
    total,
    current_page: page,
    prev_page: page > 1 ? (page - 1) : null,
    next_page: total > (skip + per_page) ? page + 1 : null,
    last_page,
    data
  }
}

export interface PaginationAwareObject {
  from: any
  to: any
  per_page: number
  total: number | any
  current_page: number
  prev_page?: number | null
  next_page?: number | null
  last_page: number | null
  data: Array<object | any> | any
}
