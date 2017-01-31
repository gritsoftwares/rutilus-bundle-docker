# rutilus-nodejs-aws
A packaged implementation of the framework using Node.js and Amazon Web Services technology.

# Configuration
Configuration is done in config/config.js. Configuration can be written as:

- a string (or environment variable cascading into a string)
```javascript
database: {
  host: process.env.DATABASE_ADDRESS || 'mongodb://localhost:27017',
}
```
- or an object specifying where the configuration comes from
```javascript
database: {
  host: {
    type: 'env',
    source: 'DATABASE_ADDRESS'
  }
}
```

To be continued.