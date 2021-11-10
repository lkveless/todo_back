const ErrorResponse = require('../classes/error-response')
const Token = require("../models/token.model")
const User = require("../models/user.model")
const { asyncHandler, requireToken } = require('../middleware/middleware')
const { Router } = require('express')
const router = Router()

function initRoutes() {
    router.get('/me', asyncHandler(requireToken), asyncHandler(getUserInfo))
    router.post('/logout', asyncHandler(requireToken), asyncHandler(logoutUser))
    router.patch('/me', asyncHandler(requireToken), asyncHandler(updateUser))
}

async function getUserInfo(req, res, next) {
    const userInfo = await User.findByPk(req.userId)
    if (!userInfo) {
      throw new ErrorResponse("No such user", 404);
    }
    res.status(200).json(userInfo)
  }
  
  async function updateUser(req, res, next) {
    const user = await User.findByPk(req.userId)
    if (!user) {
      throw new ErrorResponse("No such user", 404)
    }
    await user.update(req.body)
  
    const updUser = await User.findByPk(req.userId)
  
    res.status(200).json(updUser)
  }
  
  async function logoutUser(req, res, next) {
    await Token.destroy({
      where: {
        value: req.header("x-access-token"),
      },
    });
    const allUsersTokens = await Token.findAll()
    res.status(200).json(allUsersTokens)
  }
  
  initRoutes()

module.exports = router