export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if(!body)
  {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required parameters',
      })
    )
  }

  const userId = getRouterParam(event, 'id')
  
  const username = body.username ?? null;
  const name = body.name ?? null;
  const role = parseInt(body.role) ?? null;
  const new_password1 = body.password1 ?? null;
  const new_password2 = body.password2 ?? null;

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
    if ((new_password1 && new_password2) && new_password1 != new_password2)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Passwords are not matching',
        })
    );
    
    let password;

    if(new_password1)
      password = new_password1.trim();
  
    await User.updateOne({
      _id: userId
    }, {
      $set: {
        ...(username && { username }),
        ...(name && { name }),
        ...(role && { role }),
        ...(new_password1 && { password: password })
      }
    });
    return { success: true };
  } catch (e) {
    throw e;
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'User doesn\'t exist.',
      })
    );
  }
})
