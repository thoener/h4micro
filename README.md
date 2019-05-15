# hacking4 Node.js GRPC Microservices Framework

Starter Kit for Node.js Microservices. Includes easy to use GRPC.

The kit is used primary for Node.js Microservices which using GRPC for communication.
It is designed to be developer friendly and easy to use and easy to understand. But of course also as micro as it can be.

This kit gives you a well defined folder structure and architecture, so you can concentrate on what matters: Your microservice.

Frameworks like GRPC and Mali are great! But they don't provide an idea where to put your code. 
And you will ending up with something, that is not maintainable.
This kit solves the problem!

## Getting started

Rocket start:
1. Install the kit by cloning it
2. Read about the folder structure
3. Read about the architecture
4. Look at the example
5. Build awesome microservices!
 

### Installation

You can use this starter kit by cloning it and init a new git repository:

```bash
git clone https://github.com/hacking4/h4micro.git awesome-miocoservice
cd awesome-microservice
# Write .env file
cp .env.example .env

# Start with clean git
rm -rf .git
git init
git add .
git commit -m "Initial commit"

# install dependencies
yarn
# or
npm install

```

### Configuration

This starter kit uses `config` for the configuration of the microservice.
In short: You can define different configurations for different stages of your dev cycle.
The configuration files are named by the name of the stage. For example `production`.
All configuration files are in the `config` folder. The specific configuration is determined by the `NODE_ENV` environment variable.

For more information look at the [node-config](https://github.com/lorenwest/node-config) github page.

Furthermore we are using `dotenv` to load secrets from `.env` file. 
In short: This package reads the `.env` file and saves the values into `process.env`.

For more information look at the [dotenv](https://github.com/motdotla/dotenv) github page.

PLEASE NOTE: Please don't push your .env file to the repository!

### Yarn commands

There are three default npm / yarn commands which you can use.

**Start**

To start the microservice use

```bash
yarn run start
# or
npm run start
```

**Test**

This kit include `nyc` for code coverage und `mocha` with `chai` and `sinon` for testing. To test and coverage your microservice use

```bash
yarn test
# or
npm test
```

**Serve**

If you don't want to restart the microservice each time you changed something, you can use nodemon. It is included by default:

```bash
yarn run serve
# or
npm run serve
```

## Architecture Concepts

In this section I will describe the minimal architecture concepts.

### Folder structure

* app - This is where your microservices code lives
    * bootstrap - 
    * controllers -
    * jobs -
    * models -
    * protos -
    * providers - 
    * services - 
    * subscribers -
* config - This is where all your configuration stuff happens
* test - Here are your tests

### Service Container

This Kit  is using `awilix` as a Service Container for IoC.

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

### Application Lifecycle
1. Registering
2. Booting
3. Starting
4. Ready
5. Close
6. Error

### Default Services

By default there are the following services in the container:

* `config`
* `appTest`
* `mali`
* `chalk`
* `awilix`

### Dependency Injection
Todo...

## Usage
Todo...

### Example Proto Service

Todo...

### Add a new Service

Todo...

### Add express and traditional REST
