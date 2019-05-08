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
   */
  register() {
  }

  /**
   * Boot application services
   */
  boot() {

  }

  /**
   * Register a function which be called after the boot process
   *
   * @param callback
   */
  registerStartFunction(callback){
    this.app.startFunctions.push(callback)
  }
}
