var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/liggeran'
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('select * from verifications')
.on('row',function(row){
	console.log(row);
})
.on('end', function() { client.end(); });