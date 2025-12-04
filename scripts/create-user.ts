import mongoose from 'mongoose'
import { User } from '../server/models/user.schema.ts'

const args = process.argv.slice(2)
const [scriptPath, username, name, password, accessLevel] = args

if (!username || !name || !password) {
    console.error('Usage: ts-node scripts/create-user.ts <username> <name> <password> [access_level]')
    process.exit(1)
}

const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/miyuki_dev'

async function main() {
    await mongoose.connect(mongoUrl)
    console.log('Connected to MongoDB')

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        console.error(`User "${username}" already exists!`)
        await mongoose.disconnect()
        process.exit(1)
    }

    const user = new User({
        username,
        name,
        password,
        access_level: accessLevel ? Number(accessLevel) : 0
    })

    await user.save()
    console.log(`User "${username}" created successfully!`)

    await mongoose.disconnect()
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})
