// routes/user.routes.js
const bcrypt = require('bcrypt')

module.exports = async function (fastify) {
    const users = [] // 模拟用户数据库

    fastify.post('/register', {
        schema: {
            tags: ['User'],
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
        handler: async (request, reply) => {
            const { username, password } = request.body
            const hashedPassword = await bcrypt.hash(password, 10)
            users.push({ username, password: hashedPassword })
            reply.code(201).send({ message: '用户注册成功' })
        },
    })

    fastify.post('/login', {
        schema: {
            tags: ['User'],
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                    },
                },
            },
        },
        handler: async (request, reply) => {
            const { username, password } = request.body
            const user = users.find((u) => u.username === username)
            if (!user) {
                return reply.code(401).send({ message: '用户不存在' })
            }
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) {
                return reply.code(401).send({ message: '密码错误' })
            }
            const token = fastify.jwt.sign({ username })
            reply.send({ token })
        },
    })

    fastify.get('/me', {
        schema: {
            tags: ['User'],
            security: [{ Bearer: [] }],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        username: { type: 'string' },
                    },
                },
            },
        },
        preHandler: [fastify.authenticate],
        handler: async (request, reply) => {
            reply.send({ username: request.user.username })
        },
    })
}
