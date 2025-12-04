import { Configuration } from '~~/server/models/configuration.schema'
import { Page } from '~~/server/models/page.schema'

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

    await Page.updateOne(
    { slug: 'default' },
    {
        $setOnInsert: {
            name: 'Default',
            title: 'Status Page',
            managers: [],
            tags: [],
            groups: [],
            cname: '',
            footerOverride: ''
        }
    },
    { upsert: true }
    )
})
