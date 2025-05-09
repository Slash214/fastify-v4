// src/404.js
module.exports = function notFoundHandler(fastify, opts, done) {
    fastify.setNotFoundHandler((request, reply) => {
        reply.code(404).send({ message: 'Route not found' })
    })
    done()
}
