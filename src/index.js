require('dotenv').config()
const path = require('path')
const AutoLoad = require('@fastify/autoload')
const swagger = require('@fastify/swagger')
const swaggerUI = require('@fastify/swagger-ui')
const { port } = require('./config')
const fastify = require('fastify')({
    logger: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport:
            process.env.NODE_ENV !== 'production'
                ? {
                      target: 'pino-pretty',
                      options: {
                          colorize: true,
                          translateTime: 'SYS:standard',
                          ignore: 'pid,hostname',
                      },
                  }
                : undefined,
    },
})

// 自动加载 plugins 目录下的插件，按照文件名顺序加载
fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { prefix: '/api' },
    ignorePattern: /.*\.test\.js$/, // 忽略测试文件
})

// 自动加载 routes 目录下的路由
fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { prefix: '/api' },
    dirNameRoutePrefix: false, // 不使用目录名作为路由前缀
    autoHooks: true, // 自动加载 hooks.js
    cascadeHooks: true, // 支持父级目录的 hooks 级联
})

// ✅ 直接在入口注册 Swagger（推荐方式）
fastify.register(swagger, {
    swagger: {
        info: {
            title: 'Fastify API',
            description: 'API 文档',
            version: '1.0.0',
        },
        tags: [{ name: 'User', description: '用户相关接口' }],
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
    },
})

fastify.register(swaggerUI, {
    routePrefix: '/docs',
})

// 启动服务
const start = async () => {
    try {
        await fastify.ready()
        fastify.swagger()
        await fastify.listen({ port })
        fastify.log.info(`🚀 Server is running on port ${port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
