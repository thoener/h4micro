module.exports = class ServiceProvider {

  /**
   * Create a new Service Provider
   * You can use Dependency Injection
   */
  constructor(app) {
    this.app = app
  }

  /**
   * Register application services
   * @returns {Promise<void>}
   */
  async register() {
  }

  /**
   * Boot application services
   * @returns {Promise<void>}
   */
  async boot() {

  }

  /**
   * Starting the services
   * @returns {Promise<void>}
   */
  async start() {

  }

  /**
   * Application is ready
   * @returns {Promise<void>}
   */
  async ready() {

  }

  /**
   * Application is shutting down
   * @returns {Promise<void>}
   */
  async close() {

  }

  /**
   * Applications has an error
   * @returns {Promise<void>}
   */
  async error() {

  }
}
