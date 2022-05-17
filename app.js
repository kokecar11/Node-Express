require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morganBody = require('morgan-body')
const swaggerUi = require('swagger-ui-express')
const dbConnect = require('./config/mongo')
const openApiConfig = require('./docs/swagger')
const { loggerStream } = require('./utils/handleLogger')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('storage'))

morganBody(app, {
  prettify: true,
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400
  }
})

const port = process.env.PORT || 3001

/**
 * Ruta de la documentación.
 */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiConfig))

/**
 * Aqui se llaman las rutas
 * **/

app.use('/api', require('./app/routes'))

app.listen(port, () => {
  console.log('App lista por http://localhost:' + port)
})

dbConnect()
