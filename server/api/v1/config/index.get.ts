import { Configuration } from '~~/server/models/configuration.schema'

export default defineEventHandler(async () => {
  const entries = await Configuration.find().lean()
  
  const result: Record<string, any> = {}
  for (const entry of entries) {
    result[entry.key] = entry.value
  }

  return result
})
