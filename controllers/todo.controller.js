const Todo = require("../models/dbModels/todos.model")
const { Router } = require('express')
const router = Router();
const ErrorResponse = require('../classes/error-response')
const { asyncHandler, requireToken } = require("../middleware/middleware")

function initRoutes() {
  router.get('/', asyncHandler(requireToken), asyncHandler(getToDos))
  router.get('/:id', asyncHandler(requireToken), asyncHandler(getToDoById))
  router.post('/', asyncHandler(requireToken), asyncHandler(createToDo))
  router.delete('/:id', asyncHandler(requireToken), asyncHandler(deleteToDoById))
  router.delete('/', asyncHandler(requireToken), asyncHandler(deleteToDos))
  router.patch('/:id', asyncHandler(requireToken), asyncHandler(patchToDo))
}

async function getToDos(req, res, next) {
  const todos = await Todo.findAll({ where: { userId: req.userId } })
  res.status(200).json({ todos })
}

async function getToDoById(req, res, next) {
  const todo = await Todo.findOne({
    where: { 
      id: req.params.id, 
      userId: req.userId 
    },
  });
  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }
  res.status(200).json(todo)
}

async function createToDo(req, res, next) {
  const newTodo = await req.body
  if (!newTodo.title) {
    throw new ErrorResponse('No title', 404)
  }
  const todo = await Todo.create({
    title: newTodo.title,
    description: newTodo.description,
    userId: req.userId,
  });

  res.status(200).json(todo)
}

async function deleteToDos(req, res, next) {
  await Todo.destroy(
    { where: { 
      userId: req.userId
      } 
    })
  res.status(200).json({ message: "All todos was deleted" })
}

async function deleteToDoById(req, res, next) {
  const todo = await Todo.findOne({
    where: { 
      id: req.params.id, 
      userId: req.userId 
    },
  })
  if (!todo) {
    throw new ErrorResponse("No ToDo found", 404);
  }

  await todo.destroy()

  res.status(200).json({ message: "todo was deleted" });
}

async function patchToDo(req, res, next) {
  let todo = await Todo.findOne({
    where: { 
      id: req.params.id, 
      userId: req.userId 
    },
  });

  if (!todo) {
    throw new ErrorResponse("No Todo found", 404)
  }

  await todo.update(req.body)
  todo = await Todo.findByPk(req.params.id)
  res.status(200).json(todo)
}

initRoutes()

module.exports = router