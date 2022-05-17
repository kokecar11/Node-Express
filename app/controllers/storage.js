const { matchedData } = require('express-validator')
const { handleHttpError } = require('../../utils/handleError')
const { storageModel } = require('../models')
const PUBLIC_URL = process.env.PUBLIC_URL

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({})
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}

const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    console.log(id)
    const data = await storageModel.findById(id)
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}

const createItem = async (req, res) => {
  const { file } = req
  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`
  }
  const data = await storageModel.create(fileData)
  res.send({ data })
}

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)
    const data = await storageModel.findOneAndUpdate(id, body)
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_UPDATE_STORAGE')
  }
}

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await storageModel.delete({ _id: id })
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_STORAGE')
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
}
