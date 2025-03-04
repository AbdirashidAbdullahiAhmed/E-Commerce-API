const chechPermissions = require('./checkPermissions')
const createTokenUser = require('./createTokenUser')
const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt')

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  chechPermissions,
}
