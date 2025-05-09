// src/plugins/routes.js
const fp = require('fastify-plugin')
const { loadModules } = require('../utils/loader')

module.exports = fp(async (fastify) => {
    loadModules('routes', /\.routes\.js$/, (name, route) => {
        fastify.register(route, { prefix: `/api` })
    })
})
