const { Schema, model } = require('mongoose')

const NewUserSchema = new Schema (
    {
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
