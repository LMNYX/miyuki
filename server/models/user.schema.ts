import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema, Document, CallbackError } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser {
  username: string
  name: string
  password: string
  access_level?: number
  created_at?: Date
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  access_level: { type: Number, default: 0, required: true },
  created_at: { type: Date, default: Date.now, required: true }
}, { timestamps: true })

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = defineMongooseModel({
  name: 'User',
  schema: UserSchema,
  hooks(schema) {
    schema.pre('save', async function (this: IUser & { isModified: (path: string) => boolean }, next) {
      if (!this.isModified('password')) return next()

      try {
        const salt = await bcrypt.genSalt(5)
        this.password = await bcrypt.hash(this.password, salt)
        next()
      } catch (err) {
        next(err as CallbackError)
      }
    })


    schema.pre('updateOne', async function (next) {
      const update = this.getUpdate() as any

      const password = update?.password || update?.$set?.password
      if (!password) return next()

      try {
        const salt = await bcrypt.genSalt(5)
        const hashed = await bcrypt.hash(password, salt)

        if (update.password) {
          update.password = hashed
        } else if (update.$set?.password) {
          update.$set.password = hashed
        }

        this.setUpdate(update)
        next()
      } catch (err) {
        next(err as CallbackError)
      }
    })

  }
})