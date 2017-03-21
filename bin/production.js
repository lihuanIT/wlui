#!/usr/bin/env node

process.env.NODE_ENV = 'production'
var fs = require('fs')
var path = require('path')
try {
  fs.statSync(path.join(__dirname, '../dist'))
} catch (e) {
  console.log(e)
  console.error('pls run `npm run build` first!')
  process.exit(0)
}
require('babel-polyfill')
require('babel-core/register')({
  plugins: [
    ['babel-plugin-transform-require-ignore', {
      extensions: ['.less', '.css']
    }],
    ['inline-replace-variables', {
      __SERVER__: true
    }]
  ]
})
require('asset-require-hook')({
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'tif', 'tiff', 'webp'],
  name: '/build/[name].[ext]',
  limit: 10000
})
var middlewareRegister = require('../server/middlewareRegister')


var Koa = require('koa')
var app = new Koa()
var config = require('../common/config')
middlewareRegister(app)
app.env = 'production'
// error logger
app.on('error', function (err, ctx) {
  console.log('error occured:', err.stack)
})

var server = require('http').createServer(app.callback())

server.listen(config.port, function () {
  console.log('❤️  WLUI started  ❤️  at port %d', config.port)
})


// app.listen(3000);
