import { getRouterParams } from 'h3'
import { Configuration } from '~~/server/models/configuration.schema'

export default defineEventHandler(async (event) => {
  const { key } = getRouterParams(event)
  const entry = await Configuration.findOne({ key })
  return entry?.value
});