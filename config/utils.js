exports.env = function env(key, defaultValue){
  return process.env[key] ? process.env[key] : defaultValue
}
