# hacking4 Node.js GRPC Framework



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

module.exports = class AppServiceProvider extends ServiceProvider {
    async register() {
      // You can access the application with
      let config = this.app.container.resolve('config')
    }
    async boot() {}
    async start() {}
    async ready() {}
    async close() {}
    async error() {}
}
```

### Default Services



## Getting started
Describe how to
* add a new ServiceProvider
* add a new GRPC service
* use dependency injection

### Config

The node-config package is used to easily access config.

```javascript
let appConfig = config.get('app')
```

### Dependency Injection

By default there are the following injections:
* `config`
* `app`
* `mali`
* `chalk`
* `awilix` - yep. You can inject the service which provides dependency injection
* 


# The App Object
