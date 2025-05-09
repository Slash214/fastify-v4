// src/plugins/sequelize.js
const fp = require('fastify-plugin')
const { Sequelize, DataTypes } = require('sequelize')
const { db: dbConfig } = require('../config')
const { loadModules } = require('../utils/loader')

module.exports = fp(async function (fastify, opts) {
    const sequelize = new Sequelize({
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        username: dbConfig.username,
        password: dbConfig.password,
        dialect: dbConfig.dialect,
        logging: dbConfig.logging,
    })

    await sequelize.authenticate()
    fastify.log.info('✅ Database connected')

    // 动态加载模型
    const models = {}
    loadModules('models', /\.model\.js$/, (name, define) => {
        models[name] = define(sequelize, DataTypes)
    })
    Object.values(models).forEach((m) => m.associate?.(models))
    await sequelize.sync({ alter: true })

    // ←───① 把 db 挂在实例上
    fastify.decorate('db', { sequelize, models })

    // ←───② 为每个 request 挂上 db
    fastify.decorateRequest('db', null)
    fastify.addHook('onRequest', (request, reply, done) => {
        request.db = fastify.db
        done()
    })
})
