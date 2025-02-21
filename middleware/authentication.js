const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token

  // Log the token to verify if it is being sent
  //console.log('Token:', token)

  if (!token) {
    return next(new CustomError.UnauthenticatedError('Authentication invalid'))
  }

  try {
    const payload = isTokenValid(token)
    if (!payload) {
      return next(
        new CustomError.UnauthenticatedError('Authentication invalid')
      )
    }
    const { name, userId, role } = payload
    //console.log('Name: ', name, 'UserId: ', userId, 'Role: ', role) // ✅ Debugging line
    req.user = { name, userId, role }
    next()
  } catch (error) {
    next(new CustomError.UnauthenticatedError('Authentication invalid'))
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      )
    }
    next()
  }
}

module.exports = { authenticateUser, authorizePermissions }
