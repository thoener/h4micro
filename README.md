# hacking4 Node.js GRPC Framework

## Getting started

### Installation

### Configuration

### Yarn commands

### Add a new proto service

### Add express appTest


## Architecture Concepts

### Application Lifecycle
1. Registering
2. Booting
3. Starting
4. Ready
5. Close
6. Error

### Service Container

This Kit  is using `awilix` as a Service Container for IoC.

To register a new service 
More Docs coming soon...

### Service Providers

The application is build through service containers. These containers are in the `providers` folder.
All providers in this folder are automatically registered from the application. The providers
have all needed lifecycle methods which are called in the specific state:

```javascript
const ServiceProvider = require('./ServiceProvider')

module.exports = class ExampleServiceProvider extends ServiceProvider {
    async register() {
      // You can access the application with
      let config = this.appTest.container.resolve('config')
    }
    async boot() {}
    async start() {}
    async ready() {}
    async close() {}
    async error() {}
}
```

### Default Services

By default there are the following services in the container:

* `config`
* `appTest`
* `mali`
* `chalk`
* `awilix`



## Usage

### Dependency Injection

## 
