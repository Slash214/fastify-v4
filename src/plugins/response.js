// plugins/response.js
const fp = require('fastify-plugin')

module.exports = fp(async (fastify) => {
    fastify.addHook('onSend', async (request, reply, payload) => {
        const contentType = reply.getHeader('content-type') || ''

        // ⛔ 如果是 Swagger UI 或 HTML 页面，直接返回
        if (
            contentType.includes('text/html') ||
            request.raw.url?.startsWith('/docs') ||
            request.raw.url?.startsWith('/favicon') ||
            request.raw.url?.startsWith('/swagger')
        ) {
            return payload
        }

        if (reply.statusCode >= 400 || reply.getHeader('x-wrapped')) {
            return payload
        }

        let body
        try {
            body = typeof payload === 'string' ? JSON.parse(payload) : payload
        } catch {
            body = payload
        }

        const result = {
            code: reply.statusCode,
            message: '成功',
            data: body,
        }

        if (body && typeof body === 'object' && 'rows' in body && 'count' in body) {
            result.data = body.rows
            result.total = body.count
        }

        reply.header('x-wrapped', '1')
        return JSON.stringify(result)
    })
})
