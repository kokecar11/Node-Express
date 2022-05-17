const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/auth')
const { validatorRegisterUser, validatorLoginUser } = require('../validators/auth')

/**
 * http://localhost:3001/api
 *
 * Ruta de registrar un nuevo usuario
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Registrar nuevo usuario"
 *          description: "Esta ruta es para registar nuevos usuarios"
 *          requestBody:
 *              content:
 *                application/json:
 *                   schema:
 *                      $ref: "#/components/schemas/authRegister"
 *          responses:
 *              '201':
 *                  description: "Usuario registrado de manera correcta"
 *              '403':
 *                  description: "Error por validación del usuario"
 *
 */
router.post('/register', validatorRegisterUser, registerUser)

/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Login user"
 *      description: Iniciar session a un nuevo usuario y obtener el token de sesión
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 *      responses:
 *          '201':
 *              description: Retorna el objeto insertado en la coleccion con stado '201'
 *          '403':
 *              description: No tiene permisos '403'
 */
router.post('/login', validatorLoginUser, loginUser)

module.exports = router
