const express = require('express')
const router = express.Router()

const { getAllDataSensors, searchData, getLimitDataSensor } = require('../controllers/DataSensor.controller')

router.get('/limit', getLimitDataSensor)
router.get('/search', searchData)
router.get('/', getAllDataSensors)

module.exports = router