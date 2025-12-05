import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import { useStorage } from '#imports'

export interface SessionData {
  userId: string
  username: string
  access_level: number
}

const storage = useStorage()

export async function createSession(user: SessionData): Promise<string> {
  const salt = await bcrypt.genSalt(5);
  const token = await bcrypt.hash(`${user.username}__${randomUUID()}`, salt);
  await storage.setItem(`session:${token}`, user, { ttl: 60 * 60 * 24 });

  return token;
}

export async function getSession(token: string): Promise<SessionData | null> {
  const session = await storage.getItem<SessionData>(`session:${token}`)
  return session || null
}
