const _ = require('lodash')
const awilix = require('awilix')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

module.exports = class App {
  /**
   *
   * @param base_path
   */
  constructor(base_path) {
    // Set the basepath
    this.base_path = _.defaultTo(base_path, path.resolve(__dirname, '..'))

    // Create the container
    this.container = awilix.createContainer()

    // Init providers
    this.providers = []

    // Init start functions
    this.startFunctions = []

    // Startup the application
    this.startup()
  }

  startup() {
    /**
     * Load environment variables from .env file, where API keys and passwords are configured.
     */
    dotenv.config({path: '.env'})

    /**
     * Load configuration
     */
    this.config = require('config')

    /**
     * Bind essential services to container
     */
    this.container.register('config', awilix.asValue(this.config))
    this.container.register('app', awilix.asValue(this))
    this.container.register('awilix', awilix.asValue(awilix))

    this.registerServiceProviders()

    this.bootServiceProviders()
  }

  registerServiceProviders() {
    let providersPath = path.resolve(this.base_path, 'providers')
    fs.readdirSync(providersPath).forEach(file => {
      let providerFile = path.resolve(providersPath, file)
      const ProviderClass = require(providerFile)
      let provider = new ProviderClass(this)
      provider.register()
      this.providers.push(provider)
    })
  }

  bootServiceProviders() {
    this.providers.forEach(provider => {
      provider.boot()
    })
  }

  async start() {

    let startingFunctions = []
    this.startFunctions.forEach(func => {
      startingFunctions.push(func())
    })

    try {
      await Promise.all(startingFunctions)
    } catch (e) {
      // TODO error handling
      throw e
    }

    return this
  }
}
