const { Router } = require('express')
const ErrorResponse = require('../classes/error-response')
const Token = require("../models/dbModels/token.model")
const User = require("../models/dbModels/user.model")
const { Op } = require("sequelize")
const { asyncHandler} = require("../middleware/middleware")
const router = Router()
const { nanoid } = require('nanoid')

function initRoutes() {
  router.post('/registration', asyncHandler(registration))
  router.post('/login', asyncHandler(login))
}

async function registration(req, res, next) {
  const tryNewUser = req.body
  if (!tryNewUser.login) {
    throw new ErrorResponse('Incorrect login', 404)
  }
  if (!tryNewUser.email) {
    throw new ErrorResponse('Incorrect email', 404)
  }
  if (!tryNewUser.password){
    throw new ErrorResponse('Incorrect password', 404)
  }
  const userInDB = await User.findOne({
    where: {
      [Op.or]: [
        { login: tryNewUser.login, },
        { email: tryNewUser.email, }
      ]
    },
  })

  if (userInDB) {
    throw new ErrorResponse("User with this login or email already exists", 400);
  }

  const newUser = await User.create(tryNewUser)

  res.status(200).json(newUser)
}

async function login(req, res, next) {
  const existingUser = await User.findOne({
    where: req.body,
  })

  if (!existingUser) {
    throw new ErrorResponse("Incorrect login or password", 404);
  }

  const newToken = await Token.create({
    userId: existingUser.id,
    value: nanoid(128),
  })

  res.status(200).json({
    accessToken: newToken.value,
  })
}

initRoutes()

module.exports = router;