const ServiceProvider = require('../../../../app/providers/ServiceProvider')

module.exports = class TestServiceProvider extends ServiceProvider {
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
