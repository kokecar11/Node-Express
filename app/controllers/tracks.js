const { tracksModel } = require('../models')
const { handleHttpError } = require('../../utils/handleError')
const { matchedData } = require('express-validator')

const getItems = async (req, res) => {
  try {
    const data = await tracksModel.findAllData({})
    res.send({ data })
  } catch (e) {
    handleHttpError(res, 'ERROR_GET_TRACKS')
  }
}

const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await tracksModel.findOneData(id)
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_TRACK')
  }
}

const createItem = async (req, res) => {
  try {
    const body = matchedData(req)
    const data = await tracksModel.create(body)
    res.send({ data })
  } catch (e) {
    handleHttpError(res, 'ERROR_CREATE_TRACK')
  }
}

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)
    const data = await tracksModel.findByIdAndUpdate(id, body)
    res.send({ data })
  } catch (e) {
    handleHttpError(res, 'ERROR_UPDATE_TRACK')
  }
}

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await tracksModel.delete({ _id: id })
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_TRACK')
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
}
