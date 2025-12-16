import { defineEventHandler, sendError, H3Error } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let session;
  let offset:number = Number(query.offset);
  let sort:'asc' | 'desc' = query.offset === 'desc' ? 'desc' : 'asc';

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

  const foundUsers = await User.find({}).sort({'created_at': sort}).skip(offset).limit(50).select("-__v -_id -password").lean();
  const usersCount = await User.countDocuments({});

  return {
    users: foundUsers,
    count: usersCount
  }
})
