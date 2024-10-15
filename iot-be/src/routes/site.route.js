const express = require('express')
const router = express.Router()

const { getNewData, getDataChart, controllDevice, getStatusDevice } = require('../controllers/Site.controller')

router.get('/status', getStatusDevice)
router.post('/controll', controllDevice)
router.get('/chart', getDataChart)
router.get('/', getNewData)

module.exports = router