// src/plugins/response.js
const fp = require('fastify-plugin')

module.exports = fp(async (fastify) => {
    fastify.addHook('onSend', async (request, reply, payload) => {
        // 出错或已经自定义过了，直接返回
        if (reply.statusCode >= 400 || reply.getHeader('x-wrapped')) {
            return payload
        }

        // 1. 解析原始数据
        let body
        try {
            body = typeof payload === 'string' ? JSON.parse(payload) : payload
        } catch {
            body = payload
        }

        // 2. 构造标准结构
        const result = {
            code: reply.statusCode,
            message: '成功',
            data: body,
        }

        // 3. 如果是分页场景（findAndCountAll）
        if (body && typeof body === 'object' && 'rows' in body && 'count' in body) {
            result.data = body.rows
            result.total = body.count
        }

        // 4. 标记防止二次包装
        reply.header('x-wrapped', '1')

        return JSON.stringify(result)
    })
})
