const fp = require('fastify-plugin')
const fastifyCors = require('@fastify/cors')
const { cors } = require('../config')

module.exports = fp(async (fastify) => {
    fastify.register(fastifyCors, {
        origin: cors.origin,
        methods: cors.methods,
    })
})
