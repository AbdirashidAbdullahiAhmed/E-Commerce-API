const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {
  attachCookiesToResponse,
  createTokenUser,
  chechPermissions,
} = require('../utils')

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({ users, count: users.length })
  } catch (error) {
    next(error)
  }
}

const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('-password')
    if (!user) {
      throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
    }
    chechPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    next(error)
  }
}

const showCurrentUser = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ user: req.user })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res) => {
  const { email, name } = req.body
  if (!email || !name) {
    throw new CustomError.BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.name = name

  await user.save()

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
      throw new CustomError.BadRequestError('Please provide both values')
    }

    const user = await User.findOne({ _id: req.user.userId })
    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
