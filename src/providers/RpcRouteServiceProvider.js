const ServiceProvider = require('./ServiceProvider')

module.exports = class RpcRouteServiceProvider extends ServiceProvider {
  async register() {}
  async boot() {
    this.mali = this.resolve('mali')
    this.path = this.resolve('path')

    this.registerExample()
  }

  registerExample(){
    let protoPath = this.path.resolve(__dirname, '../protos', 'Example.proto')

    this.mali.addService(protoPath, 'Greeter')

    let ExampleController = this.resolve('ExampleController')

    this.mali.use('Greeter', 'sayHello', (ctx) => ExampleController.sayHello(ctx))
    // this.mali.use('Greeter', 'sayHi', (ctx) => ExampleController.sayHi(ctx))

  }

}
