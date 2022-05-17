const { handleHttpError } = require('../../utils/handleError')
/**
 * Array con los roles permitidos en la ruta.
 * @param {*} role
 * @returns
 */

const checkRole = (role) => (req, res, next) => {
  try {
    const { user } = req
    const rolesByUser = user.role
    const checkValueRole = role.some((roleSingle) => rolesByUser.includes(roleSingle))

    if (!checkValueRole) {
      handleHttpError(res, 'USER_NOT_PERMISSIONS')
      return
    }
    next()
  } catch (error) {
    handleHttpError(res, 'ERROR_PERMISSIONS', 403)
  }
}

module.exports = checkRole
