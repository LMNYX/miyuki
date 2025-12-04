import { getRouterParams } from 'h3'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const entries = await Page.find({ slug: slug }).select("-__v -_id -tags -managers").lean()
  return entries
})