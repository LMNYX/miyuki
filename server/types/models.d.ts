import type { Document, Types } from 'mongoose'

declare global
{
    interface IUser extends Document {
        username: string
        name: string
        password: string
        access_level: number
        created_at: Date
        comparePassword(candidatePassword: string): Promise<boolean>
    }
}