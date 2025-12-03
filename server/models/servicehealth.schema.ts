import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'
import { HTTPAuthenticationSchema } from '~~/server/models/httpauthentication.schema'

const ServiceHealthSchema = new Schema<IServiceHealth>({
    method: { type: String, enum: ['PING','TCP','GET','POST','WEBSOCKET','SOCKETIO','GRPC','MONGODB','DNS'], required: true },
    url: { type: String, required: true },
    headers: { type: Schema.Types.Mixed, default: null },
    data: { type: Schema.Types.Mixed, default: null },
    ignoreTLS: { type: Boolean, default: false },
    heartbeatInterval: { type: Number, default: 60, min: [0, "Interval cannot be negative."], max: [Number.MAX_SAFE_INTEGER, "Interval is too high."] },
    authentication: { type: HTTPAuthenticationSchema, required: false }
}, { _id: true })

export const ServiceHealth = defineMongooseModel<IServiceHealth>('Service', ServiceHealthSchema)