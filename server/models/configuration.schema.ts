import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

const ConfigurationSchema = new Schema<IConfiguration>({
    key: { type: String, required: true, unique: true },
    value: { type: Object, required: true },
}, { timestamps: true })

export const Configuration = defineMongooseModel<IConfiguration>('Configuration', ConfigurationSchema)
