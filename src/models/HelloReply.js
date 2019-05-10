const Model = require('./Model')

module.exports = class User extends Model {
  constructor(message) {
    super()
    this.message = message
  }
}
