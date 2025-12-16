import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const args = process.argv.slice(2)
const [scriptPath, username, name, password, accessLevel] = args

if (!username || !name || !password) {
    console.error('Usage: ts-node scripts/create-user.ts <username> <name> <password> [access_level]')
    process.exit(1)
}

const UserSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    access_level: { type: Number, default: 0, required: true },
    created_at: { type: Date, default: Date.now, required: true }
}, { timestamps: true })

UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', UserSchema)

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

    const saltRounds = 5
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        name,
        password: hashedPassword,
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
