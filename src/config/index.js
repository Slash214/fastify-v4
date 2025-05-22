require('dotenv').config()

module.exports = {
    port: Number(process.env.PORT) || 3000,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        dialect: 'mysql',
        logging: false,
    },
    cors: {
        origin: process.env.CORS_ORIGIN?.split(',') || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
    // Helmet 配置
    security: {
        // 如果希望关闭 CSP（某些场景下静态资源跨域需求），设 false，否则可以给对象
        contentSecurityPolicy: false,
        // referrer 策略控制
        referrerPolicy: { policy: 'no-referrer' },

        // XSS 过滤保护（旧浏览器兼容）
        xXssProtection: true,
        // 禁止资源嵌入到其他站点（防止点击劫持）
        xFrameOptions: { action: 'SAMEORIGIN' },

        // 防止 MIME 类型嗅探
        xContentTypeOptions: true,

        // 启用 DNS 预取控制（建议关闭）
        xDnsPrefetchControl: { allow: false },

        // 防止跨域信息泄露
        crossOriginResourcePolicy: { policy: 'same-origin' },

        // 控制 embedder 行为，防止 side-channel
        crossOriginEmbedderPolicy: false,
    },

    // Rate Limit 配置
    rateLimit: {
        max: Number(process.env.RATE_LIMIT_MAX) || 100, // 最多请求数
        timeWindow: process.env.RATE_LIMIT_WINDOW || '1 minute', // 时间窗口
    },
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
}
