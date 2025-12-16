import { SessionData } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  
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
    const storage = useStorage()
    const keys = await storage.keys()
    let userSessionKeys: { [key: string] : SessionData } = {}; 

    for (const key of keys) {
      if (key.startsWith('session:')) {
        const s = await storage.getItem<SessionData>(key)
        if (s && s.userId === userId) userSessionKeys[key.startsWith('session:') ? key.slice(8) : key] = s;
      }
    }

    return { sessions: userSessionKeys }
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
