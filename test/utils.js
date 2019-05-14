const Application = require('../app/bootstap/Application')
const path = require('path')

const project_path = path.resolve(__dirname, '../')
const providers_path = path.resolve(project_path, 'providers')
const mock_path = path.resolve(__dirname, 'mock')

/**
 * Paths
 */
exports.project_path = project_path
exports.mock_path = mock_path
exports.providers_path = providers_path

/**
 * Providers
 */
exports.ServiceProvider = require('../app/providers/ServiceProvider')

/**
 * Functions
 */
exports.createApplication = () => {
  return new Application(mock_path)
}

/**
 * Application
 */
exports.Application = Application
