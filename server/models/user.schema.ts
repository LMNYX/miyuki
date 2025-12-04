import mongoose, { Schema, Document, model } from 'mongoose'
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
  } catch (err) {
    throw err;
  }
})

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = (mongoose.models.User || model<IUser>('User', UserSchema)) as typeof mongoose.models.User