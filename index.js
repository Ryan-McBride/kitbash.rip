var mysql       = require('mysql');
var db          = require('./db.js');
var port        = process.env.port || 8080;
var connection;
handleDisconnect();

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
    if(error){
      fs.appendFileSync('kitbash.log', error+'\n');
    }
    res.send(JSON.stringify(results));
  });
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

function handleDisconnect(){
  connection = mysql.createConnection(db);

  connection.connect(function(err){
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on('error', function(err){
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
