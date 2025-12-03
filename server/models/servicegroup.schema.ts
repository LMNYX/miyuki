import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'
import { TagSchema } from "~~/server/models/tag.schema"

const ServiceGroupSchema = new Schema<IServiceGroup>({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    tags: { type: [TagSchema], default: [] },
    services: { type: [Schema.Types.ObjectId], ref: 'Service', default: [] },
    managers: { type: [Schema.Types.ObjectId], ref: 'User', default: [] }
}, { timestamps: true })

export const ServiceGroup = defineMongooseModel('ServiceGroup', ServiceGroupSchema)
