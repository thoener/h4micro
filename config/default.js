const env = require('./utils').env

module.exports = {
  app: {
    name: env('APP_NAME', 'h4micro'),
    url: env('APP_URL', 'http://localhost'),
    port: env('APP_PORT', 50051),
    env: env('NODE_ENV','development'),
    debug: env('APP_DEBUG', 'true'),
    locale: 'en',
    fallback_locale: 'en',
  }
}
