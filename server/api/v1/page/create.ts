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

  let slug = body.slug ?? null;
  const name = body.name ?? null;
  const title = body.title ?? null;
  const cname = body.cname ?? null;

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

  if(!slug || !name || !title)
  {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Missing required parameters',
      })
    );
  }

  try
  {
    const slugRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

    if(slug && !slugRegex.test(slug))
    {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Slug can only be alphanumeric characters and underscore',
        }));
    }

    const isSlugTaken = await Page.exists({
      slug: slug
    });

    if(isSlugTaken)
    {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Page with that slug already exists',
        })
      );
    }


    const result = await Page.create({
      slug: slug,
      name: name,
      title: title,
      cname: cname,
      footerOverride: '',
      tags: []
    });

    return {
      success: true,
      pageId: result._id
    };
  } catch (e) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
      })
    );
  }
})
