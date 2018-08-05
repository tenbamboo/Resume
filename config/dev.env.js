var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  basePath:'"http://localhost:8080"',
  servicePath :'"https://www.tenbamboo.com/common/"',
  NODE_ENV: '"development"',
  version:'"d_1.01"'
})
