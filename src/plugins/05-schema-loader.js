// plugins/05-schema-loader.js
const fp = require('fastify-plugin')
const path = require('path')
const fs = require('fs')

module.exports = fp(async (fastify) => {
    const schemasPath = path.join(__dirname, '../schemas')
    const files = fs.readdirSync(schemasPath)
    for (const file of files) {
        const schema = require(path.join(schemasPath, file))
        if (Array.isArray(schema)) {
            schema.forEach((s) => fastify.addSchema(s))
        } else {
            fastify.addSchema(schema)
        }
    }
})
