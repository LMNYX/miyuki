import { ServiceGroup } from '~~/server/models/servicegroup.schema'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const entries = await ServiceGroup.find({slug: slug}).select("-_id -tags -managers").lean()
  return entries
})
