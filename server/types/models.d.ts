import type { Document, Types } from 'mongoose'

declare global
{
    interface IUser extends Document {
        username: string
        name: string
        password: string
        access_level: number
        created_at: Date
        comparePassword(candidatePassword: string): Promise<boolean>
    }

    interface IConfiguration extends Document {
        key: string,
        value: any
    }

    interface IHTTPAuthentication
    {
        username: string,
        password: string
    }

    enum ServiceHeartbeatMethod
    {
        PING,
        TCP,
        GET,
        POST,
        WEBSOCKET,
        SOCKETIO,
        GRPC,
        MONGODB,
        DNS
    }

    enum UserAccessLevel
    {
        USER = 0,
        EDITOR = 30,
        ADMIN = 60,
        SUPERADMIN = 90
    }

    interface IServiceHealth {
        method: ServiceHeartbeatMethod,
        url: string,
        headers: string | null,
        data: string | Object,
        ignoreTLS: boolean,
        heartbeatInterval: number,
        authentication: IHTTPAuthentication
    }

    interface ITag
    {
        slug: string,
        name: string
    }

    interface IService extends Document {
        slug: string,
        name: string,
        displayName: string,
        tags: ITag[],
        healthcheck: IServiceHealth,
    }

    interface IServiceGroup
    {
        slug: string,
        name: string,
        displayName: string,
        tags: ITag[],
        services: IService[],
        managers: IUser[]
    }

    interface IStatusPage
    {
        slug: string,
        name: string,
        title: string,
        managers: IUser[],
        tags: ITag[],
        groups: IServiceGroup[],
        cname: string,
        footerOverride: string | null
    }
}