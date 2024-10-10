// site
const siteRoute = require('./site.route')

// datasensor
const datasensorRoute = require('./dataSensor.route')

//history
const historyRoute = require('./histotyDevice.route')

function route(app){
    app.use('/datasensor', datasensorRoute)
    app.use('/history', historyRoute)
    app.use('/', siteRoute)
}

module.exports = route;