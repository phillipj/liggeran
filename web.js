var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(req, res){
	res.send('<h1>Hvordan ligger du an?</h1>');
});

var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log('Listening on port: ' + port);
});

funciton initDatabase(){
var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM your_table');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});
}

