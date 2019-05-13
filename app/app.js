const Application = require('./bootstap/Application')
const path = require('path')

// create Application
let app = new Application(path.resolve(__dirname, '..'))

;(async () => {
  await Promise.all([app.run()])
})()

/**
 * Using this:
 * let app = require('./app')
 * app.on('ready', (app) =>  {})
 * @type {module.App|*}
 */
module.exports = app
