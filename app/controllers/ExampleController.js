const Controller = require('./Controller')

module.exports = class ExampleController extends Controller {
  /**
   * Create a new Example Controller
   *
   * @param GreeterService
   * @param mali
   */
  constructor(GreeterService) {
    super()
    this.Greeter = GreeterService
  }

  /**
   * Implementation of sayHello
   *
   * @param ctx
   */
  sayHello(ctx) {
    this.Greeter.sayHello(ctx)
  }

  /**
   * Implementation of sayHis
   * @param ctx
   */
  sayHi(ctx) {
    this.Greeter.sayHi(ctx)
  }
}
