const ErrorResponse = require("../classes/error-response.js")
const Token = require("../models/token.model.js")

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
};

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next)
    } catch (error) {
        next(error)
    }
};


const requireToken = async (req, res, next) => {
  const token = req.header("x-access-token")
  if (!token) {
      throw new ErrorResponse("Token wast sent ", 404);
  }

  const dbToken = await Token.findOne({
      where: { value: token },
  });

  if (!dbToken) {
      throw new ErrorResponse("Incorrect token", 404)
  }
  req.userId = dbToken.userId

  next()
}

const errorHandler = (err, _req, res, _next) => {
    console.log('Ошибка', {
        message: err.message,
        stack: err.stack,
    });
    res.status(err.code || 500).json({
        message: err.message
    })
}

module.exports = {
    asyncHandler,
    syncHandler,
    errorHandler,
    requireToken
}