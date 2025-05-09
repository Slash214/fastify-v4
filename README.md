# Fastify V4 Boilerplate

这是一个基于 **Fastify v4** + **Sequelize(MySQL)** 的后台服务模板，适用于个人项目和小型企业后台接口开发。模板已经集成：

-   Fastify 核心
-   MySQL 数据库连接（Sequelize ORM）
-   动态加载模型与路由
-   CORS 支持 (`@fastify/cors`)
-   全局统一响应格式
-   全局错误处理
-   404 路由处理
-   日志美化（`pino-pretty`）
-   环境变量管理（`dotenv`）

## 新增功能

-   安全防护（`fastify-helmet`）
-   请求限流（`@fastify/rate-limit`）
-   项目结构说明
-   使用示例

---

## 安装与启动

1. 克隆仓库并安装依赖：

    ```bash
    git clone <your-repo-url>
    cd fastify-v4
    npm install
    ```

2. 创建并配置数据库：

    ```sql
    CREATE DATABASE IF NOT EXISTS your_database
      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    ```

3. 在项目根目录创建 `.env` 文件：

    ```dotenv
    NODE_ENV=development
    PORT=3120

    DB_HOST=localhost
    DB_PORT=3306
    DB_NAME=your_database
    DB_USER=your_user
    DB_PASS=your_password

    CORS_ORIGIN=*  # 或者指定域名，用逗号分隔
    ```

4. 本地开发启动：

    ```bash
    npm run dev
    ```

5. 生产环境启动：

    ```bash
    npm start
    ```

---

## 新增插件配置示例

### 安全头 (Helmet)

在 `src/plugins/helmet.js` 中添加：

```js
const fp = require('fastify-plugin')
const fastifyHelmet = require('fastify-helmet')

module.exports = fp(async (fastify) => {
    fastify.register(fastifyHelmet, {
        contentSecurityPolicy: false, // 根据需求启用/禁用
    })
})
```

然后在 `src/index.js` 注册：

```js
fastify.register(require('./plugins/helmet'))
```

### 限流 (Rate Limit)

在 `src/plugins/rate-limit.js` 中添加：

```js
const fp = require('fastify-plugin')
const rateLimit = require('@fastify/rate-limit')

module.exports = fp(async (fastify) => {
    fastify.register(rateLimit, {
        max: 100,
        timeWindow: '1 minute',
    })
})
```

并在 `src/index.js` 注册：

```js
fastify.register(require('./plugins/rate-limit'))
```

---

## 项目结构

```
fastify-v4/
├── src/
│   ├── config/           # 配置文件
│   ├── controllers/      # 控制器
│   ├── models/           # Sequelize 模型
│   ├── plugins/          # Fastify 插件 (DB, CORS, Helmet, RateLimit, …)
│   ├── routes/           # 路由定义
│   ├── utils/            # 公共工具 (loader.js)
│   ├── 404.js            # 全局 404 处理
│   └── index.js          # 应用入口
├── .env                  # 环境变量
├── package.json
└── README.md
```

---

## 使用指南

1. **新增模型**：在 `src/models` 下创建 `xxx.model.js`，并定义 `associate` 方法（如有）。
2. **新增路由**：在 `src/routes` 下创建 `xxx.routes.js`，导出路由函数。
3. **业务开发**：在 `src/controllers` 下编写对应控制器以实现具体逻辑。
4. **统一响应**：在控制器中通过 `reply.send(...)` 返回数据，插件会自动包装 `{ code, message, data }`。

---

## 后续优化

-   使用迁移工具管理数据库 schema（如 Sequelize CLI + Umzug）
-   集成接口文档（`fastify-swagger`）
-   增加身份认证与权限管理
-   配置 CI/CD，自动化测试与部署

欢迎 Star ⭐ 并在此基础上自由扩展！
