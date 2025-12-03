import { Service } from '~~/server/models/service.schema'

export default defineEventHandler(async (event) => {
  const entries = await Service.find().select("-_id -tags").lean()
  return entries
})
