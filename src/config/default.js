function env(key, defaultValue){
  return process.env[key] ? process.env[key] : defaultValue
}

module.exports = {
  app: {
    name: env('APP_NAME', 'h4Service'),
    url: env('APP_URL', 'http://localhost'),
    port: env('APP_PORT', 50051),
    key: env('APP_KEY', ''),
    env: env('APP_ENV','development'),
    debug: env('APP_DEBUG', 'false'),
    locale: 'en',
    fallback_locale: 'en',
    providers: [

    ]
  }
}
