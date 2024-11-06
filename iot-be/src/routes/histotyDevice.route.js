const express = require('express')
const router = express.Router()

const { sortMiddleware } = require('../middlewares/Sort.Middleware')
const { searchTime, getAllHistoryDevice } = require('../controllers/HistoryDevice.controller')

router.get('/search',sortMiddleware, searchTime)
router.get('/',sortMiddleware, getAllHistoryDevice)

module.exports = router