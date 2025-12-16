import { SessionData, deleteSession } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const sessionId = getRouterParam(event, 'session_id')
  
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
    if(!userId || !sessionId)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Bad Request.',
        })
      );
    const userSession = await getSession(sessionId);

    if(!userSession || userSession.userId != userId)
    {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: 'Session doesn\'t exist.',
        })
      );
    }

    await deleteSession(sessionId);
    
    return { success: true }
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
