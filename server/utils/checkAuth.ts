// server/utils/requireAuth.ts
import { getCookie, createError } from 'h3'
import { getSession } from './session'

export interface AuthContext {
  session: {
    userId: string
    username: string
    access_level: number
  }
}

export async function requireAuth(event: Parameters<typeof getCookie>[0]): Promise<AuthContext> {
  const token = getCookie(event, 'auth_token')
  if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const session = await getSession(token)
  if (!session) throw createError({ statusCode: 401, message: 'Invalid session' })

  return { session }
}
