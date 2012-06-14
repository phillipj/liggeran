var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/liggeran'
  , client
  , query;

console.log("connecting");
client = new pg.Client(connectionString);
client.connect();
console.log("query");
query = client.query('select token, ip from verifications')
.on('row',function(row){
	console.log(row);
})
.on('end', function() { 
	console.log("request ended");
	client.end(); 
});