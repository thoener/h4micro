const Application = require('./bootstap/app')

// create Application
let app = new Application(__dirname)

// Start it!
Promise.all([app.start()])
  .then(() => {
    console.log('Application is running')
  })
  .catch((err) => {
    console.log('Could not start application.')
    console.error(err)
  })

module.exports = app
