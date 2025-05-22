// plugins/07-jwt.js
const fp = require('fastify-plugin')
const jwt = require('@fastify/jwt')
const { jwtSecret } = require('../config')

module.exports = fp(async (fastify) => {
    fastify.register(jwt, { secret: jwtSecret })
    fastify.decorate('authenticate', async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
})
