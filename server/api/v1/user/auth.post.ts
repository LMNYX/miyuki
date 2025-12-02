import { defineEventHandler, readBody, sendError } from 'h3'
import { User } from '~~/server/models/user.schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try
  {
    const { username, password } = body
  } catch
  {
    return sendError(
      event,
      createError(
        {
          statusCode: 400,
          statusMessage: 'Missing required parameters'
        }
      )
    )
  }

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required parameters',
      })
    )
  }

  let userCard = await User.findOne({
    username: username
  }).select('+password');

  if(!userCard)
  {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    );
  }

  const isPasswordCorrect = userCard.comparePassword(password);

  if (!isPasswordCorrect) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    );
  }

  const tokenUser = await createSession({
    userId: userCard.id,
    username: userCard.username,
    access_level: userCard.access_level
  });

  setCookie(event, 'auth_token', tokenUser);

  return { success: true, auth_token: tokenUser }
})
