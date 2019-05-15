const env = require('./utils').env

module.exports = {
  app: {
    env: env('NODE_ENV','production'),
    debug: env('APP_DEBUG', 'false'),
  }
}
