'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CLIENT_ID: '"4e6be8922156e1a8740e"',
  CLIENT_SECRET: '"7339db6d09424acc5bf9c67cde360a6b6f4f7a1e"'
})
