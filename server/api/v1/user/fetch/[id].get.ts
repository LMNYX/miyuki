export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id')
  
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
  
  try
  {
    const foundUser = await User.findOne({
      _id: userId
    }).select("-__v -password").lean();

    return {
      user: foundUser
    };
  } catch {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'User doesn\'t exist.',
      })
    );
  }
})
