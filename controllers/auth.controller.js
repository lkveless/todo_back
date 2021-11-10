const {Router} = require('express')
const ErrorResponse = require('../classes/error-response')
const Token = require("../models/token.model")
const User = require("../models/user.model")
const { Op } = require("sequelize")
const { asyncHandler, requireToken } = require("../middleware/middleware")
const router = Router()
const {nanoid} = require('nanoid')

function initRoutes() {
    router.post('/registration', asyncHandler(registration))
    router.post('/login', asyncHandler(login))
}

async function registration(req, res, next) {
    const userInDB = await User.findOne({
      where: {
        [Op.or]: [
          { login: req.body.login, },
          { email: req.body.email, }
        ]
      },
    })
  
    if (userInDB) {
      throw new ErrorResponse("User with this login or email already exists!", 400);
    }
  
    const newUser = await User.create(req.body)
  
    res.status(200).json(newUser)
  }
  
  async function login(req, res, next) {
    const existingUser = await User.findOne({
      where: req.body,
    })
  
    if (!existingUser) {
      throw new ErrorResponse("Incorrect login or password!", 404);
    }
  
    const newToken = await Token.create({
      userId: existingUser.id,
      value: nanoid(128),
    })
  
    res.status(200).json({
      accessToken: newToken.value,
      // userId: existingUser.userId,
      // login: existingUser.login,
      // password: existingUser.password,
      // email: existingUser.email
      existingUser,
    })
  }

initRoutes()

module.exports = router;