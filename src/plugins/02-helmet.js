// src/plugins/helmet.js
const fp = require('fastify-plugin')
const helmet = require('@fastify/helmet')
const { security } = require('../config')

module.exports = fp(async (fastify) => {
    await fastify.register(helmet, security)
})
