import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const HTTPAuthenticationSchema = new Schema({
username: { type: String, required: true },
password: { type: String, required: true }
})

export const HTTPAuthentication = defineMongooseModel('HTTPAuthentication', HTTPAuthenticationSchema)