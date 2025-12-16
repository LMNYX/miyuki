import { defineEventHandler, sendError, H3Error } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let session;
  let offset:number = Number(query.offset);
  const sort:'asc' | 'desc' = query.offset === 'desc' ? 'desc' : 'asc';
  const search = typeof query.search === 'string' ? query.search.trim() : ''


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

  if(session.session.access_level < 90)
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
      { username: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } },
    ]
  }

  const foundUsers = await User.find(filter).sort({'created_at': sort}).skip(offset).limit(50).select("-__v -password").lean();
  const usersCount = await User.countDocuments(filter);

  return {
    users: foundUsers,
    count: usersCount
  }
})
