const ServiceProvider = require('./ServiceProvider')
const Mali = require('mali')
const {asFunction} = require('awilix')

module.exports = class AppServiceProvider extends ServiceProvider {

  register() {
    let mali = () => {
      return new Mali()
    }
    // Register Mali
    this.app.container.register('mali', asFunction(mali).singleton())

    // bind app to context
    mali = this.app.container.resolve('mali')
    mali.context.app = this.app

    // register start function
    this.registerStartFunction(this.start.bind(this))
  }

  boot() {
    let mali = this.app.container.resolve('mali')

    let appName = mali.context.app.config.get('app.name')
  }

  async start() {
    /**
     * Start GRPC server.
     */
    let mali = this.app.container.resolve('mali')
    let config = this.app.container.resolve('config')
    let chalk = this.app.container.resolve('chalk')

    await mali.start(config.get('app.url') + ':' + config.get('app.port'))

    console.log('%s GRPC server is running at http://%s:%d in %s mode',
      chalk.green('✓'), config.get('app.url'), config.get('app.port'),
      config.get('app.env'))

  }
}
