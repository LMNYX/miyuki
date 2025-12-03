import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const HTTPAuthenticationSchema = new Schema({
username: { type: String, required: [true, "Username is required for HTTP authentication."] },
password: { type: String, required: [true, "Password is required for HTTP authentication."] }
})

export const HTTPAuthentication = defineMongooseModel('HTTPAuthentication', HTTPAuthenticationSchema)