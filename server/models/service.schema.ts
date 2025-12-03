import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const ServiceSchema = new Schema<IService>({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    tags: { type: Object, required: true },
    healthcheck: { type: Object, required: true },
}, { timestamps: true })

export const Service = defineMongooseModel<IService>('Service', ServiceSchema)
