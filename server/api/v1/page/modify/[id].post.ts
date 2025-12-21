import { buildMongoUpdate } from '~~/server/utils/buildMongoUpdate'
import mongoose from 'mongoose';
const slugRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

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

  const pageId = getRouterParam(event, 'id')
  
  let slug = body.slug !== null ? body.slug : '';
  let name = body.name !== null ? body.name : '';
  let title = body.title !== null ? body.title : '';
  let cname = body.cname !== null ? body.cname : '';
  const tags = body.tags !== null ? body.tags : null;
  const managers = body.managers !== null ? body.managers : null;
  const groups = body.groups !== null ? body.groups : null;
  const footerOverride = body.footerOverride !== null ? body.footerOverride : '';

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
    if (body.managers) {
      body.managers = body.managers.map((u: IUser) => ({
        _id: new mongoose.Types.ObjectId(u._id),
        username: u.username,
        name: u.name
      }))
    }

    const update = buildMongoUpdate(body, {
      slug: {
        trim: true,
        toLowerCase: true,
        transform: (v) => {
          if (v && !slugRegex.test(v)) {
            throw createError({
              statusCode: 400,
              statusMessage: 'Invalid slug format'
            })
          }
          return v
        }
      },
      name: { trim: true },
      title: { trim: true },
      cname: { trim: true, unsetOnNull: true },
      footerOverride: { unsetOnNull: true },
      tags: {},
      managers: {},
      groups: {}
    })
    await Page.updateOne(
      { _id: pageId },
      update
    );
    return { success: true };
  } catch (e) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: e.message,
      })
    );
  }
})
