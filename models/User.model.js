const { Schema, model } = require('mongoose')

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

const NewUser = model('NewUser', NewUserSchema)

module.exports = NewUser
