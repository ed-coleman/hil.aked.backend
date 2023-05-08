const { expressjwt } = require('express-jwt')
require('dontenv').config()

module.exports = expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"]
})