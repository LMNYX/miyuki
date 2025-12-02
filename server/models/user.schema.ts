import { defineMongooseModel } from '#nuxt/mongoose'
import { CallbackError, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const _userSchema = new Schema({
    username: {
        type: 'string',
        required: true
    },
    name: {
        type: 'string',
        rqeuired: true
    },
    password: {
        type: 'string',
        required: true
    },
    access_level: {
        type: Number,
        default: 0,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
}, { timestamps: true });

_userSchema.pre('save', async function (next) {
    const user = this;
    const SALT_ROUNDS = 5;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(user.password as string, salt);
        user.password = hash;
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

_userSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	return await bcrypt.compare(candidatePassword, this.password);
};

export const UserSchema = defineMongooseModel({
    name: 'User',
    schema: _userSchema
})