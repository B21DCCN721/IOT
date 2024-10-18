const express = require('express')
const router = express.Router()

const { searchData, getAllDataSensors } = require('../controllers/DataSensor.controller')

router.get('/search', searchData)
router.get('/',getAllDataSensors)

module.exports = router