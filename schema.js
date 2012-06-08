var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/liggeran'
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE reporters (email varchar(200), date date, lastLogin date)');
query.on('end', function() { client.end(); });