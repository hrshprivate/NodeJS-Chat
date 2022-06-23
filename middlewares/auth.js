const tokenService = require('../service/token')

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(Error('Not Auth'))
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(Error('Not Auth'))
    }

    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(Error('Not Auth'))
    }

    req.user = userData
    next()
  } catch (e) {
    return next(Error('Not Auth'))
  }
}
