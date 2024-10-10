const express = require('express')
const router = express.Router()

const { getAllHistoryDevice, searchTime, getLimitHistory } = require('../controllers/HistoryDevice.controller')

router.get('/limit', getLimitHistory)
router.get('/search', searchTime)
router.get('/', getAllHistoryDevice)

module.exports = router