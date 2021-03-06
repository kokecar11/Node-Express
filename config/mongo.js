const mongoose = require('mongoose')
const dbConnect = () => {
  const DB_URI = process.env.DB_URI
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    if (!err) {
      console.log('***** CONEXIÓN CORRECTA *****')
    } else {
      console.log('***** ERRROR EN LA CONEXIÓN *****')
    }
  })
}

module.exports = dbConnect
