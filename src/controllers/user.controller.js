// src/controllers/user.controller.js
async function listUsers(request, reply) {
    // 从 query 拿分页参数，默认 page=1, size=10
    const page = parseInt(request.query.page, 10) || 1
    const pageSize = parseInt(request.query.pageSize, 10) || 10
    const offset = (page - 1) * pageSize

    // findAndCountAll 会返回 { rows: [...], count: 总条数 }
    const result = await request.db.models.User.findAndCountAll({
        offset,
        limit: pageSize,
        order: [['id', 'ASC']], // 可选：保证顺序
    })

    // 直接把 { rows, count } 交给 onSend 钩子处理
    return reply.code(200).send(result)
}

async function getUser(request, reply) {
    const { id } = request.params
    const user = await request.db.models.User.findByPk(id)
    if (!user) {
        return reply.code(404).send({ message: 'User not found' })
    }
    return reply.send(user)
}

async function createUser(request, reply) {
    const user = await request.db.models.User.create(request.body)
    return reply.code(201).send(user)
}

async function updateUser(request, reply) {
    const user = await request.db.models.User.findByPk(request.params.id)
    if (!user) return reply.code(404).send({ message: 'User not found' })
    await user.update(request.body)
    return reply.send(user)
}

async function deleteUser(request, reply) {
    const user = await request.db.models.User.findByPk(request.params.id)
    if (!user) return reply.code(404).send({ message: 'User not found' })
    await user.destroy()
    return reply.code(204).send()
}

module.exports = {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
