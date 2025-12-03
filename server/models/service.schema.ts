import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const ServiceSchema = new Schema<IService>({
    slug: { type: String, required: [true, "Please specify a slug."], unique: true },
    name: { type: String, required: [true, "Please specify a name."] },
    displayName: { type: String, required: [true, "Please specify display name."] },
    tags: { type: Object, required: true, default: [] },
    healthcheck: { type: Object, required: [true, "Healthcheck rules are required."] },
}, { timestamps: true })

export const Service = defineMongooseModel<IService>('Service', ServiceSchema)
