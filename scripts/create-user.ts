import mongoose, { Schema, Document } from 'mongoose'

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
UserSchema.pre('save', async function(doc) {
    const user = this
    if (!user.isModified('password')) return

    try {
        const salt = await bcrypt.genSalt(5)
        user.password = await bcrypt.hash(user.password, salt)
        } catch (err) {
    }
})

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', UserSchema);

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
