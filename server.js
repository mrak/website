#!/usr/bin/env node
var Server = require('node-static').Server;
var http = require('http');
var fs = require('fs');

var assets = new Server('./public');

http.createServer(function (request, response) {
  request.addListener('end', function () {
    if (/^\/(js|html|css|images)/.test(request.url)) {
      assets.serve(request, response);
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(fs.readFileSync('./public/index.html'));
    }
  }).resume();
}).listen(8080, '0.0.0.0');
