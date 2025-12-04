import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema, Document, CallbackError } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  access_level: { type: Number, default: 0, required: true },
  created_at: { type: Date, default: Date.now, required: true }
}, { timestamps: true })

UserSchema.pre('save', async function(next) {
  const user = this
  if (!user.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(5)
    user.password = await bcrypt.hash(user.password, salt)
    next()
  } catch (err) {
    next(err as CallbackError)
  }
})

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = defineMongooseModel<IUser>('User', UserSchema)
