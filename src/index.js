require('dotenv').config()
const fastify = require('fastify')({
    logger: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        // 开发环境用 pino-pretty
        transport:
            process.env.NODE_ENV !== 'production'
                ? {
                      target: 'pino-pretty',
                      options: {
                          colorize: true, // 彩色高亮
                          translateTime: 'SYS:standard', // 打印系统时间
                          ignore: 'pid,hostname', // 忽略无关字段
                      },
                  }
                : undefined,
    },
})
const { port } = require('./config')

// 1️⃣ 先挂数据库插件：
//    - decorate('db', …)
//    - decorateRequest('db', null) + addHook('onRequest', …)
fastify.register(require('./plugins/sequelize'))

// 2️⃣ 再挂其他通用插件
fastify.register(require('./plugins/cors'))

// 安全 & 限流
fastify.register(require('./plugins/helmet'))
fastify.register(require('./plugins/rate-limit'))

fastify.register(require('./plugins/response'))
fastify.register(require('./plugins/error-handler'))

// 3️⃣ 挂路由插件（就保证在 上面所有插件之后）
//    所有 routes/*.routes.js 会自动以 /api/<filename> 为前缀注册
fastify.register(require('./plugins/routes'))

// 4️⃣ 全局 404
fastify.setNotFoundHandler((req, reply) => {
    reply.code(404).send({
        code: 404,
        error: { message: 'Route not found' },
        timestamp: Date.now(),
    })
})

// 4. 启动
const start = async () => {
    try {
        await fastify.listen({
            port,
            host: '0.0.0.0',
        })
        fastify.log.info(`🚀 Server listening on port ${port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
