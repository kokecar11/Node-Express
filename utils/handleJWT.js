const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

/**
 * Se debe pasar el objeto del Usuario.
 * @param {*} user
 * @returns sign
 */
const tokenSign = async (user) => {
  const sign = await jwt.sign(
    {
      _id: user._id,
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: '2h'
    }
  )
  return sign
}
/**
 *
 * @param {*} tokenJWT
 * @returns
 */

const verifyToken = async (tokenJWT) => {
  try {
    return jwt.verify(tokenJWT, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = { tokenSign, verifyToken }
