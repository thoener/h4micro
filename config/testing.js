const env = require('./utils').env

module.exports = {
  app: {
    name: env('APP_NAME', 'test'),
    url: env('APP_URL', 'http://localhost'),
    port: env('APP_PORT', 50051),
    env: env('NODE_ENV','development'),
    debug: env('APP_DEBUG', 'false'),
    test: 'test',
    locale: 'en',
    fallback_locale: 'en',
    providers: [

    ]
  }
}
