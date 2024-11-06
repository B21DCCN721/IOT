const express = require('express')
const router = express.Router()

const { sortMiddleware } = require('../middlewares/Sort.Middleware')
const { searchData, getAllDataSensors, soLanCanhBao } = require('../controllers/DataSensor.controller')

router.get('/canhbao', soLanCanhBao)
router.get('/search',sortMiddleware , searchData)
router.get('/',sortMiddleware, getAllDataSensors)

module.exports = router