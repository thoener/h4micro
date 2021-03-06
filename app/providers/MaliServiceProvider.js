const ServiceProvider = require('./ServiceProvider')
const Mali = require('mali')

module.exports = class MaliServiceProvider extends ServiceProvider {

  async register() {
    console.log('Registering MaliServiceProvider')
    let mali = new Mali()
    mali.context.app = this.app
    let awilix = this.app.container.resolve('awilix')
    // Register Mali
    this.app.container.register('mali', awilix.asValue(mali))
  }

  async boot() {
    console.log('Booting MaliServiceProvider')
    let mali = this.app.container.resolve('mali')
  }

  async start() {
    console.log('Starting MaliServiceProvider')
    /**
     * Start GRPC server.
     */
    let mali = this.resolve('mali')
    let config = this.resolve('config')
    let chalk = this.resolve('chalk')

    await mali.start(config.get('app.url') + ':' + config.get('app.port'))

    console.log('%s GRPC server is running at http://%s:%d in %s mode',
      chalk.green('✓'), config.get('app.url'), config.get('app.port'),
      config.get('app.env'))

  }
}
