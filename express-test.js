var express = require ('express');
var server = express();
var fileServer = express();
var fs = require ('fs');

server.get('/', function(req, res){
  res.send('hello');
});

server.get('/file', function(req, res){
  res.set('X-Accel-Redirect', '/files');
  res.send('haha');
});

server.get('/tmp/:id', function(req, res){
  res.set('X-Accel-Redirect', '/tmps/' + req.params.id);
  res.send('hihi');
});

fileServer.get('/files', function(req, res){
  fs.createReadStream('./package.json').pipe(res);
});

server.listen(4001);
fileServer.listen(4002);
