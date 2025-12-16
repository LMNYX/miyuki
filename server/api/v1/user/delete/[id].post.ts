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

    if(!foundUser)
    {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: 'User doesn\'t exist.',
        })
      );
    }

    const storage = useStorage()
    const keys = await storage.keys()
    
    for (const key of keys) {
      if (key.startsWith('session:')) {
        const s = await storage.getItem<SessionData>(key)
        if (s && s.userId === userId) deleteSession(key);
      }
    }

    await User.deleteOne({'_id': userId});

    return {
      success: true
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
