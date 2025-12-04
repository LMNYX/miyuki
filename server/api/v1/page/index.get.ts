export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  if (!('cname' in query))
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required parameters',
      })
    )

  let page = await Page.findOne({cname: query.cname}).select("-__v -_id -tags -managers").lean();

  if(!page)
    page = await Page.findOne({slug: 'default'}).select("-__v -_id -tags -managers").lean();

  return page
})
