const express = require('express')
const uploadMiddleware = require('../../utils/handleStorage')
const { createItem, getItems, getItem, deleteItem } = require('../controllers/storage')
const { validatorGetItem } = require('../validators/storage')

const router = express.Router()
/**
 * Lista de Items
 */
router.get('/', getItems)
/**
 * Obtener detalle
 */
router.get('/:id', validatorGetItem, getItem)
/**
 * Crear Item
 */
router.post('/', uploadMiddleware.single('myfile'), createItem)

// router.put('/:id', uploadMiddleware.single('myfile'), updateItem)
/**
 * Eliminar Item
 */
router.delete('/:id', validatorGetItem, deleteItem)

module.exports = router
