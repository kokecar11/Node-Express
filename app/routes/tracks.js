const express = require('express')
const router = express.Router()

const { validatorCreateItem, validatorGetItem } = require('../validators/tracks')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks')

const authMiddleware = require('../middlewares/session')
const checkRole = require('../middlewares/role')

router.get('/', authMiddleware, getItems)

router.get('/:id', validatorGetItem, getItem)

router.post('/', authMiddleware, checkRole(['admin']), validatorCreateItem, createItem)

router.put('/:id', [validatorGetItem, validatorCreateItem], updateItem)

router.delete('/:id', validatorGetItem, deleteItem)

module.exports = router
