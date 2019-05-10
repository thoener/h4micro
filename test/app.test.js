const Application = require('../src/bootstap/app')
const assert = require('assert')
let appTest = require('../src/app')

describe('Application',() => {
  it('creating an application', () => {
    assert(true, appTest instanceof Application)
  })
})
