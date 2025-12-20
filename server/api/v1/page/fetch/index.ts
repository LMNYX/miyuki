import { defineEventHandler, sendError, H3Error } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let session;
  let offset:number = Number(query.offset);
  const sort:'asc' | 'desc' = query.offset === 'desc' ? 'desc' : 'asc';
  const search = typeof query.search === 'string' ? query.search.trim() : ''

  let tags: { key: string; value: string }[] = []

  if (query['tags[]']) {
    // query['tags[]'] can be a string if only one tag is sent, or array if multiple
    const rawTags = Array.isArray(query['tags[]']) ? query['tags[]'] : [query['tags[]']]
    tags = rawTags.map(tag => {
      const [key, value] = (tag as string).split(':')
      return { key, value }
    })
  }

  if (isNaN(offset)) offset = 0;

  try
  {
    session = await requireAuth(event);

  }
  catch (e:any)
  {
    return sendError(
      event,
      createError({
        statusCode: e.statusCode,
        statusMessage: e.message,
      })
    );
  }

  if(session.session.access_level < 60)
  {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Forbidden',
      })
    );
  }

  const filter: any = {}

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { title: { $regex: search, $options: 'i' } },
    ]
  }

  for (const t of tags) {
    switch (t.key) {
      case 'slug':
        filter.slug = t.value
        break
      case 'tag':
        filter['tags.slug'] = filter['tags.slug']
          ? { $in: [...filter['tags.slug'].$in, t.value] }
          : { $in: [t.value] }
        break
    }
  }

  const foundPages = await Page.find(filter).sort({'createdAt': sort}).skip(offset).limit(50).select("-__v -password").lean();
  const pagesCount = await Page.countDocuments(filter);

  return {
    pages: foundPages,
    count: pagesCount
  }
})
