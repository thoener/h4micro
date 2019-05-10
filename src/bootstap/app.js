const awilix = require('awilix')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const Emittery = require('emittery')

const REGISTER_EVENT = 'register'
const BOOT_EVENT = 'boot'
const START_EVENT = 'start'
const CLOSE_EVENT = 'close'
const ERROR_EVENT = 'error'
const READY_EVENT = 'ready'

module.exports = class App extends Emittery {

  /**
   *
   * @param base_path
   */
  constructor(base_path) {
    super()
    // Set the base_path
    this.base_path = (base_path == null || base_path !== base_path) ?
      path.resolve(__dirname, './..') :
      base_path

    // Init the application
    this.init()
  }

  /**
   * Init the application
   */
  init() {
    /**
     * Init the container
     */
    this.container = awilix.createContainer()

    /**
     * Init providers
     */
    this.providers = []

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
    this.container.register('path', awilix.asValue(path))

    /**
     * Scan all service providers
     */
    this.scanServiceProviders()
  }

  /**
   * Run the application
   * @returns {Promise<void>}
   */
  async run() {
    this.registerServiceProviders()

    try {
      console.log('Registering')
      await this.emit(REGISTER_EVENT, [this])

      console.log('Booting')
      await this.emit(BOOT_EVENT, [this])

      console.log('Starting')
      await this.emit(START_EVENT, [this])

      console.log('Ready')
      await this.emit(READY_EVENT, [this])
    } catch (e) {
      console.error('Application couldn\'t run.')
      console.error(e)
      await this.emit(ERROR_EVENT, [e])
      console.log('Trying graceful shutdown.')
      await this.emit(CLOSE_EVENT, [e])
    }

  }

  /**
   * Register all Service Providers
   */
  scanServiceProviders() {
    // get provider path
    let providersPath = path.resolve(this.base_path, 'providers')

    // Scan for providers
    fs.readdirSync(providersPath).forEach(file => {
      // Find provider
      let providerFile = path.resolve(providersPath, file)
      const ProviderClass = require(providerFile)
      // Create an instance
      let provider = new ProviderClass(this)
      // Push providers to our stack
      this.providers.push(provider)
    })
  }

  registerServiceProviders(){
    this.providers.forEach((provider) => {
      // Push functions to emitter
      this.on(REGISTER_EVENT, (data) => provider.register(data))
      this.on(BOOT_EVENT, (data) => provider.boot(data))
      this.on(START_EVENT, (data) => provider.start(data))
      this.on(READY_EVENT, (data) => provider.ready(data))
      this.on(CLOSE_EVENT, (data) => provider.close(data))
      this.on(ERROR_EVENT, (data) => provider.error(data))
    })
  }

  /*
  Helpful functions
   */

  resolve(...args) {
    return this.container.resolve(...args)
  }

  register(...args) {
    return this.container.register(...args)
  }


  /*
   * Constant getters
   */

  /**
   * Event name for registering state
   * @returns {string}
   * @constructor
   */
  static get REGISTER_EVENT() {
    return REGISTER_EVENT
  }

  /**
   * Event name for booting state
   * @returns {string}
   * @constructor
   */
  static get BOOT_EVENT() {
    return BOOT_EVENT
  }

  /**
   * Event name for stating state
   * @returns {string}
   * @constructor
   */
  static get START_EVENT() {
    return START_EVENT
  }

  /**
   * Event name for ready state
   * @returns {string}
   * @constructor
   */
  static get READY_EVENT() {
    return READY_EVENT
  }

  /**
   * Event name for closing state
   * @returns {string}
   * @constructor
   */
  static get CLOSE_EVENT() {
    return CLOSE_EVENT
  }

  /**
   * Event name error event
   * @returns {string}
   * @constructor
   */
  static get ERROR_EVENT() {
    return ERROR_EVENT
  }
}
