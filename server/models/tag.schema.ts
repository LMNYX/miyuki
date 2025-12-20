import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const TagSchema = new Schema<ITag>({
slug: { type: String, required: true },
name: { type: String, required: true },
})

export const Tag = defineMongooseModel('Tag', TagSchema)