// src/routes/user.routes.js
const {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/user.controller')

async function userRoutes(fastify, opts) {
    fastify.get('/users', listUsers)
    fastify.get('/users/:id', getUser)
    fastify.post('/users', createUser)
    fastify.put('/users/:id', updateUser)
    fastify.delete('/users/:id', deleteUser)
}

module.exports = userRoutes
