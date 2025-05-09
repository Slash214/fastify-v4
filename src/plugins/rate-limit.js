// src/plugins/rate-limit.js
const fp = require('fastify-plugin')
const rateLimit = require('@fastify/rate-limit')
const { rateLimit: rlConfig } = require('../config')

module.exports = fp(async (fastify) => {
    fastify.register(rateLimit, {
        max: rlConfig.max,
        timeWindow: rlConfig.timeWindow,
        // 可选：对某些路径或 IP 白名单放行
        // allowList: [ '127.0.0.1' ],
        // errorResponseBuilder: (req, context) => ({
        //   code: 429,
        //   message: 'Too Many Requests',
        //   error: 'RateLimitExceeded'
        // })
    })
})
