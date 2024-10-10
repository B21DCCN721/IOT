const express = require('express')
const router = express.Router()

const { getNewData, getDataChart, controllDevice } = require('../controllers/Site.controller')

router.post('/controll', controllDevice)
router.get('/chart', getDataChart)
router.get('/', getNewData)

module.exports = router