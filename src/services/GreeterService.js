module.exports = class GreeterService {
  constructor(HelloReply) {
    this.HelloReply = HelloReply
  }

  sayHello(ctx) {
    ctx.res = new this.HelloReply('Hello ' + ctx.req.name)
  }

  sayHi(ctx) {
    ctx.res = new this.HelloReply('Hi ' + ctx.req.name)
  }
}
