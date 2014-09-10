var http = require ('http');
var fs = require ('fs');

var server = http.createServer(function(req, res){
  if (req.url.indexOf('/file') == 0) {
    res.setHeader('X-Accel-Redirect', '/files');
    res.end('');
  }
  else if (req.url.indexOf('/tmp') == 0){
    res.setHeader('X-Accel-Redirect', '/tmps/' + req.url.split('/').pop());
    res.end('');
  } else {
    res.end('haha');
  }
});

var fileServer = http.createServer(function(req, res){
  if (req.url.indexOf('/files') == 0) {
    fs.createReadStream('./package.json').pipe(res);
  }
});

server.listen(4001);
fileServer.listen(4002);
