var mysql       = require('mysql');
var db          = require('./db.js');
var connection  = mysql.createConnection(db);

var http = require('http');
var fs = require('fs');

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.file('/public/index.html');
});

app.get('/shuffle', function(req, res) {
  connection.query('SELECT * FROM gunpla ORDER BY rand() LIMIT 2', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

var httpServer = http.createServer(app);

httpServer.listen(8080);
console.log('http server listening on port 8080');
