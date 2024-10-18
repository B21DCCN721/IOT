const express = require('express')
const router = express.Router()

const { searchTime, getAllHistoryDevice } = require('../controllers/HistoryDevice.controller')

router.get('/search', searchTime)
router.get('/', getAllHistoryDevice)

module.exports = router