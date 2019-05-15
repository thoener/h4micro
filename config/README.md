# NOTE
This is copied from the node-config wiki:

[See here](https://github.com/lorenwest/node-config/wiki/Configuration-Files)


# Configuration

The configuration is handled by the NPM package config.

Important section of the package:

## Config Directory

Node-config reads configuration files in the ```./config``` directory for the running process, typically the application root.  This can be overridden by setting the ```$NODE_CONFIG_DIR``` environment variable to the directory containing your configuration files. It can also be set from node, before loading Node-config:
```
process.env["NODE_CONFIG_DIR"] = __dirname + "/configDir/";
const config = require("config");
```

```$NODE_CONFIG_DIR``` can be a full path from your root directory, or a relative path from the process if the value begins with ```./``` or ```../```.

## File Load Order

Files in the config directory are loaded in the following order:

    default.EXT
    default-{instance}.EXT
    {deployment}.EXT
    {deployment}-{instance}.EXT
    {short_hostname}.EXT
    {short_hostname}-{instance}.EXT
    {short_hostname}-{deployment}.EXT
    {short_hostname}-{deployment}-{instance}.EXT
    {full_hostname}.EXT
    {full_hostname}-{instance}.EXT
    {full_hostname}-{deployment}.EXT
    {full_hostname}-{deployment}-{instance}.EXT
    local.EXT
    local-{instance}.EXT
    local-{deployment}.EXT
    local-{deployment}-{instance}.EXT
    (Finally, custom environment variables can override all files)

Where 

* ```EXT``` can be .yml, .yaml, .xml, .coffee, .cson, [.properties](https://github.com/gagle/node-properties), [.json](http://json.org/), [.json5](http://json5.org/), [.hjson](http://laktak.github.io/hjson/), .ts or .js depending on the format you prefer (see below)
* ```{instance}``` is an optional instance name string for [Multi-Instance Deployments](#multi-instance-deployments)
* ```{short_hostname}``` is your server name up to the first dot, from the ```$HOST``` or ```$HOSTNAME``` environment variable or ```os.hostname()``` (in that order). For example if your hostname is ```www.example.com``` then it would load ```www.EXT```.
* ```{full_hostname}``` is your whole server name, you may use this when ```{short_hostname}``` collides with other machines.
* ```{deployment}``` is the deployment name, from the ```$NODE_ENV``` (or if specified, ```$NODE_CONFIG_ENV```) environment variable

The ```default.EXT``` file is designed to contain all configuration parameters from which other files may overwrite.  Overwriting is done on a parameter by parameter basis, so subsequent files contain only the parameters unique for that override.

```{hostname}``` and ```{deployment}``` files allow you to tune configurations for a particular server or deployment.  These files are designed to live along with other files in your version control system.
