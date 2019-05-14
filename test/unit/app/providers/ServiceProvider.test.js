const utils = require('../../../utils')
const awilix = require('awilix')
const expect = require('chai').expect

describe('ServiceProvider', () => {

  it('should resolve services from app', () => {
    let app = utils.createApplication()
    let provider = new utils.ServiceProvider(app)
    app.register('test', awilix.asValue(123))

    expect(provider.resolve('test')).to.be.eq(123)
  })
})
