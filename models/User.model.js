const { Schema, model } = require('mongoose')

const NewUserSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    }
)

const NewUser = model('NewUser', NewUserSchema)

module.exports = NewUser
