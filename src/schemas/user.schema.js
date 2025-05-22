// src/schemas/user.schema.js
module.exports = [
    {
        $id: 'user.create',
        type: 'object',
        required: ['username', 'email'],
        properties: {
            username: { type: 'string', minLength: 3 },
            email: { type: 'string', format: 'email' },
        },
    },
    {
        $id: 'user.query',
        type: 'object',
        properties: {
            page: { type: 'integer', minimum: 1, default: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
        },
    },
    {
        $id: 'user.response',
        type: 'object',
        properties: {
            id: { type: 'integer' },
            username: { type: 'string' },
            email: { type: 'string' },
        },
    },
]
