const Application = require('./../../src/bootstap/app')
const awilix = require('awilix')
const path = require('path')
const expect = require('chai').expect

describe('Application class', () => {
  it('creates application without base_path', () => {
    let app = new Application()
    expect(app).to.be.instanceof(Application)
    expect(app.base_path).to.be.equal(path.resolve(__dirname , './../../src'))
  })

  it('resolves from container', () => {
    let app = new Application()
    app.container.register('test', awilix.asValue(123))
    expect(app.resolve('test')).to.be.equal(123)
  })

  it('can register new services', () => {
    let app = new Application()
    app.register('test', awilix.asValue(123))
    expect(app.container.resolve('test')).to.be.equal(123)
  })
})
