const express = require('express')
const router = express.Router()

const { searchTime, getLimitHistory } = require('../controllers/HistoryDevice.controller')

router.get('/search', searchTime)
router.get('/', getLimitHistory)

module.exports = router