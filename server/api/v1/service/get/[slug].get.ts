import { Service } from '~~/server/models/service.schema'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const entries = await Service.find({ slug: slug }).select("-_id -tags").lean()
  return entries
})
