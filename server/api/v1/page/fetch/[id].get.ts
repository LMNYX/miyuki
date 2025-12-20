import { getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  const _id = getRouterParam(event, 'id')

  let session;
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

  try
  {
    const foundPage = await Page.findOne({
      _id: _id
    }).select("-__v").lean();

    return {
      page: foundPage
    };
  } catch {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Page doesn\'t exist.',
      })
    );
  }
})