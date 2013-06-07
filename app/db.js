var cradle = require('cradle');

var db = new(cradle.Connection)('https://nodejitsudb1056617742.iriscouch.com/', 6984, {
  cache: true,
  raw: false
}).database('liggeran');
console.log('connected to:', db);
db.exists(function(err, exists){
	if (err){
		console.err('does not exist');
	}
});