//Здесь содержатся все нужные маршруты для работы с api
module.exports = app =>{
    const todos = require('../controllers/todo.controller')

    const express = require('express')
    const router = express.Router()

    router.post('/', todos.create)
    router.get('/', todos.findAll)
    router.get('/:id', todos.findOne)
    router.put('/:id', todos.update)
    router.delete('/', todos.deleteAll)
    router.delete('/:id', todos.deleteOne)

    app.use('/api/todos', router)
}