const { Schema, model, Types } = require('mongoose')

const NewUserSchema = new Schema (
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

const NewUser = model('User', NewUserSchema)

module.exports = NewUser
