var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/liggeran'
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();
//query = client.query('CREATE TABLE reporters (email varchar(200), date date, lastLogin date)');
query = client.query('drop table verifications');
query = client.query('CREATE TABLE verifications (token varchar(200), requesteddate varchar(30), ip varchar(100))');
query.on('end', function() { client.end(); });