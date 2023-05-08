const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: [true],
        },
    }
)

const User = model('User', userSchema)

module.exports = User