const express = require('express')
const router = express.Router()

const { searchData, getLimitDataSensor } = require('../controllers/DataSensor.controller')

router.get('/search', searchData)
router.get('/',getLimitDataSensor)

module.exports = router