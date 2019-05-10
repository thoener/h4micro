const Application = require('./bootstap/app')

// create Application
let app = new Application(__dirname)

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
