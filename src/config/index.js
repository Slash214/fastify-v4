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
        // 还可以按需配置其它 Helmet 选项，比如：
        // crossOriginEmbedderPolicy: true,
        // referrerPolicy: { policy: 'no-referrer' },
    },

    // Rate Limit 配置
    rateLimit: {
        max: Number(process.env.RATE_LIMIT_MAX) || 100, // 最多请求数
        timeWindow: process.env.RATE_LIMIT_WINDOW || '1 minute', // 时间窗口
    },
}
