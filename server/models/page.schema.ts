import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const PageSchema = new Schema<IStatusPage>({
    slug: { type: String, unique: true, required: [true, "Please specify a slug."] },
    name: { type: String, required: [true, "Please specify name."] },
    title: { type: String, required: [true, "Please specify title."] },
    managers: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    tags: { type: [TagSchema], default: [] },
    groups: { type: [Schema.Types.ObjectId], ref: 'Group', default: [] },
    cname: { type: String, required: false },
    footerOverride: { type: String, required: false }
})

export const Page = defineMongooseModel('Page', PageSchema)