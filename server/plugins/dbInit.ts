import { Configuration } from '~~/server/models/configuration.schema'

export default defineNitroPlugin(async (nitroApp) => {
    const { defaultConfig } = await import('../config/defaults');

    await Configuration.bulkWrite(
        defaultConfig.map(item => ({
            updateOne: {
            filter: { key: item.key },
            update: { $setOnInsert: item },
            upsert: true
            }
        }))
    );
})
