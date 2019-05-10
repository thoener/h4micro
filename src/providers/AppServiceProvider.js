const ServiceProvider = require('./ServiceProvider')
const path = require('path')
const {asValue, Lifetime} = require('awilix')
const chalk = require('chalk')

module.exports = class AppServiceProvider extends ServiceProvider {

  async register() {
    console.log('Registering AppServiceProvider')
    // resolve awilix
    this.awilix = this.app.container.resolve('awilix')

    this.registerModels()

    // push chalk to container
    this.app.container.register('chalk', this.awilix.asValue(chalk))

  }

  async boot() {
    console.log('Booting AppServiceProvider')
  }

  registerModels() {

    // register all models
    let modelsPath = path.resolve(this.app.base_path, 'models', '*.js')

    this.app.container.loadModules([
      [
        modelsPath,
        {
          register: this.awilix.asValue,
          lifetime: this.awilix.Lifetime.SINGLETON,
        },
      ],
    ])
  }

  async start(){
    console.log('Starting AppServiceProvider')
  }
}
