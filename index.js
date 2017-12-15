var port = process.env.port || 8080;
var http = require('http');
var fs = require('fs');
var gunpla = JSON.parse(fs.readFileSync('./gunpla.json'));

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.file('/public/index.html');
});

app.get('/shuffle', function(req, res) {
  var records = [];
  records.push(gunpla[rand(gunpla.length)]);
  records.push(gunpla[rand(gunpla.length)]);
  res.send(JSON.stringify(records));
});

app.get('/page-not-found', function(req, res){
  res.sendFile('404.html', {root: __dirname+'/public', status:404});
});

app.get('*', function(req, res){
  res.redirect('/page-not-found');
});

var httpServer = http.createServer(app);

httpServer.listen(port);
console.log('http server listening on port '+port);

function rand(max){
  return (Math.floor(Math.random() * max) + 1) - 1 
  //need to subtract 1 because otherwise this would sometimes return -1
}
