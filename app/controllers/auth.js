const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../../utils/handlePassword')
const { usersModel } = require('../models')
const { tokenSign } = require('../../utils/handleJWT')
const { handleHttpError } = require('../../utils/handleError')

/**
 * Controlador para registrar Usuarios.
 * @param {*} req
 * @param {*} res
 */
const registerUser = async (req, res) => {
  try {
    req = matchedData(req)
    const passwordHashed = await encrypt(req.password)
    const body = { ...req, password: passwordHashed }
    const dataUser = await usersModel.create(body)
    dataUser.set('password', undefined, { strict: false })
    const data = {
      user: dataUser,
      token: await tokenSign(dataUser)
    }
    res.status(201)
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_REGISTER_USER')
  }
}

/**
 * Controlador para Logear Usuarios.
 * @param {*} req
 * @param {*} res
 */
const loginUser = async (req, res) => {
  try {
    req = matchedData(req)

    const user = await usersModel.findOne({ email: req.email }).select('password name email role')
    if (!user) {
      return handleHttpError(res, 'USER_NOT_EXISTS', 404)
    }

    const hashPassword = user.get('password')
    const check = await compare(req.password, hashPassword)

    if (!check) {
      return handleHttpError(res, 'PASSWORD_INVALID', 401)
    }
    user.set('password', undefined, { strict: false })
    const data = {
      token: await tokenSign(user),
      user
    }

    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_LOGIN_USER')
  }
}

module.exports = { registerUser, loginUser }
