import { ServiceGroup } from '~~/server/models/servicegroup.schema'

export default defineEventHandler(async (event) => {
  const entries = await ServiceGroup.find().select("-_id -tags -managers").lean()
  return entries
})
