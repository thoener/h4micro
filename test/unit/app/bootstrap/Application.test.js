const utils = require('../../../utils')
const Application = utils.Application
const createApplication = utils.createApplication
const mock_path = utils.mock_path
const project_path = utils.project_path

const awilix = require('awilix')
const sinon = require('sinon')
const path = require('path')
const expect = require('chai').expect

describe('Application', () => {

  beforeEach(() => {
    // Clear all setted .env files
    const dotenv = require('dotenv')
    const fs = require('fs')
    let envConfig = dotenv.parse(
      fs.readFileSync(path.resolve(mock_path, '.env')))
    for (let k in envConfig) {
      delete process.env[k]
    }
  })

  afterEach(() => {
    sinon.restore()
  })

  it('creates application without base_path', () => {
    let App = require('../../../../app/bootstap/Application')
    sinon.stub(App, 'resolveBasePath').callsFake(() => {
      return mock_path
    })

    let app = new App()
    expect(app).to.be.instanceof(App)
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
  it('should load dotenv values', () => {
    let app = createApplication()
    expect(process.env.APP_NAME).to.be.eq('test')
  })

  it('loads the config file', () => {
    let app = createApplication()
    expect(app.config.app.test).to.be.eq('test')
  })

  it('should have registered config', () => {
    let app = createApplication()
    expect(app.resolve('config')).to.be.eq(app.config)
  })

  it('should have registered app', () => {
    let app = createApplication()
    expect(app.resolve('app')).to.be.eq(app)
  })

  it('should have registered awilix', () => {
    let app = createApplication()
    expect(app.resolve('awilix').prototype)
      .to.be.eq(awilix.createContainer().prototype)
  })

  it('should have registered path', () => {
    let app = createApplication()
    expect(app.resolve('path')).to.be.eq(path)
  })

  it('should call register lifecycle hook', (done) => {
    let app = createApplication()
    let provider = mockProviderWithHook('register', done)
    app.providers.push(provider)
    app.run().then()
  })

  it('should call boot lifecycle hook', (done) => {
    let app = createApplication()
    let provider = mockProviderWithHook('boot', done)
    app.providers.push(provider)
    app.run().then()
  })

  it('should call start lifecycle hook', (done) => {
    let app = createApplication()
    let provider = mockProviderWithHook('start', done)
    app.providers.push(provider)
    app.run().then()
  })

  it('should call ready lifecycle hook', (done) => {
    let app = createApplication()
    let provider = mockProviderWithHook('ready', done)
    app.providers.push(provider)
    app.run().then()
  })

  it('should call error lifecycle hook on error', (done) => {
    let app = createApplication()
    let provider = mockProviderWithHook('error', done)
    provider.ready = async () => {
      throw new Error('Test error')
    }

    app.providers.push(provider)
    app.run().then()
  })

  it('should call close lifecycle hook after error', (done) => {
    let app = createApplication()
    let provider = mockProviderWithHook('close', done)
    provider.ready = async () => {
      throw new Error('Test error')
    }

    app.providers.push(provider)
    app.run().then()
  })

  function mockProviderWithHook(hook, done) {
    const ServiceProvider = require('../../../../app/providers/ServiceProvider')
    let provider = new ServiceProvider()
    provider[hook] = async () => {
      done(false)
    }
    return provider
  }

  it('should resolve from container', () => {
    let app = createApplication()
    app.container.register('testing.js', awilix.asValue(123))
    expect(app.resolve('testing.js')).to.be.equal(123)
  })

  it('should register new services', () => {
    let app = createApplication()
    app.register('testing.js', awilix.asValue(123))
    expect(app.container.resolve('testing.js')).to.be.equal(123)
  })

  it('should resolve the base path', () => {
    let app_path = Application.resolveBasePath()
    expect(app_path).to.be.eq(path.resolve(project_path))
  })

  it('should return register event name', () => {
    expect(Application.REGISTER_EVENT).to.be.eq('register')
  })

  it('should return boot event name', () => {
    expect(Application.BOOT_EVENT).to.be.eq('boot')
  })

  it('should return start event name', () => {
    expect(Application.START_EVENT).to.be.eq('start')
  })

  it('should return ready event name', () => {
    expect(Application.READY_EVENT).to.be.eq('ready')
  })

  it('should return close event name', () => {
    expect(Application.CLOSE_EVENT).to.be.eq('close')
  })

  it('should return error event name', () => {
    expect(Application.ERROR_EVENT).to.be.eq('error')
  })
})
