// src/utils/loader.js
const path = require('path')
const fs = require('fs')

function loadModules(dir, filePattern, callback) {
    const dirPath = path.join(__dirname, '..', dir)
    fs.readdirSync(dirPath)
        .filter((name) => filePattern.test(name))
        .forEach((name) => {
            const define = require(path.join(dirPath, name))
            // 把文件名（如 'user'）转成首字母大写 'User'
            const base = name.replace(filePattern, '')
            const modelName = base.charAt(0).toUpperCase() + base.slice(1)
            callback(modelName, define)
        })
}

module.exports = { loadModules }
