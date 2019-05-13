const Application = require('../../../../app/bootstap/Application')
const awilix = require('awilix/lib/awilix')
const AwilixContainer = require('awilix/lib/container')
const path = require('path')
const expect = require('chai').expect

const project_path = path.resolve(__dirname, '../../../../')
const mock_path = path.resolve(__dirname, '../../../mock')

function createApplication() {
  return new Application(mock_path)
}

describe('Application', () => {

  beforeEach(() => {
    // Clear all setted .env files
    const dotenv = require('dotenv')
    const fs = require('fs')
    let envConfig = dotenv.parse(fs.readFileSync(path.resolve(mock_path, '.env')))
    for(let k in envConfig){
      delete process.env[k]
    }
  })

  it('creates application without base_path', () => {
    let App = require('../../../../app/bootstap/Application')
    App.prototype.resolveBasePath = () => mock_path
    let app = new App()
    expect(app).to.be.instanceof(Application)
    expect(app.base_path).to.be.equal(mock_path)
  })

  it('creates application with base_path', () => {
    let app = createApplication()
    expect(app).to.be.instanceof(Application)
    expect(app.base_path).to.be.eq(mock_path)
  })

  it('creates a container', () => {
    let app = createApplication()
    expect(app.container.prototype).not.to.be.null

  })

  it('should registers all providers from folder', () => {
    let app = createApplication()
    const ExampleProvider = require(
      '../../../mock/app/providers/TestServiceProvider')
    expect(app.providers).to.have.lengthOf.at.least(1)
    let hasAnInstanceOfExampleServiceProvider = false
    app.providers.forEach(provider => {
      if (provider instanceof ExampleProvider) {
        hasAnInstanceOfExampleServiceProvider = true
      }
    })
    expect(hasAnInstanceOfExampleServiceProvider).to.be.true
  })

  it('should registers each provider only one time', () => {
    let app = createApplication()
    const ExampleProvider = require(
      '../../../mock/app/providers/TestServiceProvider')
    let instancesOfExampleServiceProvider = 0
    app.providers.forEach(provider => {
      if (provider instanceof ExampleProvider) {
        instancesOfExampleServiceProvider++
      }
    })
    expect(instancesOfExampleServiceProvider).to.be.equal(1)
  })

  it('should call register lifecycle hook', (done) => {
    const ServiceProvider = require('../../../../app/providers/ServiceProvider')
    let provider = new ServiceProvider()
    provider.register = async () => { done(false) }

    let app = createApplication()
    app.providers.push(provider)
    app.run().then()
  })

  it('should load dotenv values', () => {
    let app = createApplication()
    expect(process.env.APP_NAME).to.be.eq('test')
  })

  it('loads the config file', () => {
    let app = createApplication()
    expect(app.config.app.test).to.be.eq('test')
  })

  it('resolves from container', () => {
    let app = createApplication()
    app.container.register('testing.js', awilix.asValue(123))
    expect(app.resolve('testing.js')).to.be.equal(123)
  })

  it('can register new services', () => {
    let app = createApplication()
    app.register('testing.js', awilix.asValue(123))
    expect(app.container.resolve('testing.js')).to.be.equal(123)
  })
})
