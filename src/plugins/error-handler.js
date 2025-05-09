const fp = require('fastify-plugin')

module.exports = fp(async (fastify) => {
    fastify.setErrorHandler((error, request, reply) => {
        fastify.log.error(error)
        const status = error.statusCode >= 400 ? error.statusCode : 500
        const res = {
            code: status,
            error: {
                message: error.message || 'Internal Server Error',
                ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
            },
            timestamp: Date.now(),
        }
        reply.status(status).send(res)
    })
})
