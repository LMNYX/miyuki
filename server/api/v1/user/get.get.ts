import { defineEventHandler, sendError, H3Error } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let session;
  let offset:number = Number(query.offset);

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

  const foundUsers = await User.find({}).skip(offset).limit(10).select("-__v -_id -password").sort({'created_at': -1}).lean();

  return {
    users: foundUsers
  }
})
