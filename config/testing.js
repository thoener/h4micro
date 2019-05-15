const env = require('./utils').env

module.exports = {
  app: {
    name: env('APP_NAME', 'test'),
    test: 'test',
  }
}
