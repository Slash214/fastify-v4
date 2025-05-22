# Fastify V4 Boilerplate

这是一个基于 **Fastify v4** + **Sequelize(MySQL)** 的后台服务模板，适用于个人项目和小型企业后台 API 开发。模板已经集成：

-   Fastify v4 核心
-   MySQL 数据库连接 (通过 Sequelize ORM)
-   动态加载模型与路由
-   JWT 身份验证 (通过 @fastify/jwt)
-   Swagger UI + 自动文档 (@fastify/swagger)
-   CORS 支持 (@fastify/cors)
-   Helmet HTTP 头部安全配置 (@fastify/helmet)
-   请求限流 (@fastify/rate-limit)
-   全局符合格式的 JSON 响应
-   全局错误处理
-   404 路由处理
-   日志美化 (pino-pretty)
-   环境变量管理 (.env)

---

## 安装与启动

1. 克隆项目并安装依赖：

    ```bash
    git clone <your-repo-url>
    cd fastify-v4
    npm install
    ```

2. 创建数据库：

    ```sql
    CREATE DATABASE IF NOT EXISTS your_database
      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    ```

3. 配置环境变量：

    ```dotenv
    NODE_ENV=development
    PORT=3120

    DB_HOST=localhost
    DB_PORT=3306
    DB_NAME=your_database
    DB_USER=your_user
    DB_PASS=your_password

    JWT_SECRET=your-secure-secret

    CORS_ORIGIN=https://your-frontend.com  # 允许跨域域名
    ```

4. 本地启动：

    ```bash
    npm run dev
    ```

5. 生产环境启动：

    ```bash
    npm start
    ```

6. 访问 API 文档：

    ```url
    http://localhost:3120/docs
    ```

---

## 插件配置示例

### 安全头 (Helmet)

```js
// plugins/02-helmet.js
const fp = require('fastify-plugin')
const helmet = require('@fastify/helmet')
const { security } = require('../config')

module.exports = fp(async (fastify) => {
    await fastify.register(helmet, security)
})
```

### 限流 (Rate Limit)

```js
// plugins/04-rate-limit.js
const fp = require('fastify-plugin')
const rateLimit = require('@fastify/rate-limit')
const { rateLimit: config } = require('../config')

module.exports = fp(async (fastify) => {
    await fastify.register(rateLimit, config)
})
```

### CORS

```js
// plugins/03-cors.js
const fp = require('fastify-plugin')
const cors = require('@fastify/cors')
const { cors: corsConfig } = require('../config')

module.exports = fp(async (fastify) => {
    await fastify.register(cors, corsConfig)
})
```

---

## 项目目录

```
src/
├── index.js              // 应用入口
├── config/               // 配置文件 (.env -> config)
├── plugins/              // Fastify 插件
│   ├── 01-sequelize.js   // ORM 数据库连接
│   ├── 02-helmet.js      // 安全头插件
│   ├── 03-cors.js        // 跨域配置
│   ├── 04-rate-limit.js  // 请求限流
│   ├── 05-schema-loader.js
│   ├── 06-jwt.js         // JWT 身份验证
├── controllers/          // 控制器层
├── services/             // 业务逻辑
├── routes/               // 路由分组
├── models/               // Sequelize 模型
├── schemas/              // JSON Schema 验证
├── utils/                // 工具函数
└── response.js           // 全局响应格式
```

---

## 开发指南

1. 新增模型：`/models/*.model.js` 中定义数据库模型
2. 新增路由：`/routes/*.routes.js` 中定义接口定义
3. 统一响应：所有 `reply.send(data)` 都会被格式化为 `{ code, message, data }`
4. JWT 验证：在需要验证的路由中使用 `preHandler: [fastify.authenticate]`
5. Swagger 文档：默认启用 `/docs` 路由，支持 tags + 接口模型

---

## 后续可选扩展
-   配置化 RBAC (角色執行权限)
-   OAuth2/三方登录组件
-   使用 Sequelize 迁移 CLI + Umzug 管理数据表
-   Jest 自动化接口测试
-   Docker 化部署 & CI/CD

---

欢迎 Star 以支持我们，并可在此基础上自由扩展！
