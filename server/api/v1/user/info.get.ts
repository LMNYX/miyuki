import { defineEventHandler, sendError, H3Error } from 'h3'

export default defineEventHandler(async (event) => {
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

  return {
    session: session.session
  }
})
