# hacking4 Node.js GRPC Boilerplate

## Usage
Describe how to
* add a new ServiceProvider
* add a new GRPC service
* use dependency injection

### Config

The node-config package is used to easily access config.

```javascript
let appConfig = config.get('app')
```

### Using Service Provider and Service Container

Lifecycle:

1. register - First all `register` methods are called from ServiceProvider. Here you can register any service to the application
2. boot - After registering all services, all boot functions are called
3. start

### Dependency Injection

By default there are the following injections:
* `config`
* `app`
* `mali`
* `chalk`
* `awilix` - yep. You can inject the service which provides dependency injection
* 


# The App Object
