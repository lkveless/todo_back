const ErrorResponse = require('../classes/error-response')
const Token = require("../models/dbModels/token.model")
const User = require("../models/dbModels/user.model")
const { asyncHandler, requireToken } = require('../middleware/middleware')
const { Router } = require('express')
const router = Router()

function initRoutes() {
  router.get('/me', asyncHandler(requireToken), asyncHandler(getUserInfo))
  router.patch('/me', asyncHandler(requireToken), asyncHandler(updateUser))
  router.post('/logout', asyncHandler(requireToken), asyncHandler(logoutUser))
}

async function getUserInfo(req, res, next) {
  const userInfo = await User.findByPk(req.userId)
  res.status(200).json(userInfo)
}

async function updateUser(req, res, next) {
  const user = await User.findByPk(req.userId)
  await user.update(req.body)

  const updUser = await User.findByPk(req.userId)

  res.status(200).json(updUser)
}

async function logoutUser(req, res, next) {
  await Token.destroy({
    where: {
      value: req.header("token"),
    },
  });
  
  res.status(200).json({message: "Success logout"})
}

initRoutes()

module.exports = router