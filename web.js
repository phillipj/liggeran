var express = require('express');
var stache = require('stache');

var app = express.createServer(express.logger());
app.use(express.bodyParser());

app.set('view engine', 'mustache');
app.register('.mustache', stache);
app.use(express.static(__dirname + '/statics'));
app.use(express.logger('dev'));

app.get('/', function(req, res){
	res.render('registration', {
		locals: {
		}
	})
});

app.get('/about',function(req, res){
	res.render('about');
});
app.get('/privacy',function(req, res){
	res.render('privacy');
});
app.get('/faq',function(req, res){
	res.render('faq');
});


// ===========================================
//  Registration process
// ===========================================

var crypto = require('crypto');
app.post('/register', function(req,res){
	var email = req.param('email');
	console.log('Email:' + email);
	var shaHasher = crypto.createHash('sha1');
	shaHasher.update(email);
	var token = shaHasher.digest('hex');
	console.log('Token:' + token);
	var requestIp = ''
	// lookup token in db
	var pg = require('pg');
	var dbUrl = process.env.DATABASE_URL || 'tcp://espdallo@localhost:5432/liggeran';
	pg.connect(dbUrl, function(err, client) {
		if (err){
			console.log('Handling connection error', err);
		} else {
			var ip = "10.0.0.2";
			var now = new Date();
			client.query('INSERT INTO verifications(token, requesteddate, ip) values(\'{' + token + '}\', \'{' + now + '}\', \'{' + ip + '}\')')
	/*client.query({
	  text: "INSERT INTO verifications(token, requesteddate, ip) values($1, $2, $3)",
	  name: 'add verification',
	  values: [token, now, ip]
	})*/	.on('row', function(row) {
		      	console.log('Inserted row:', row);
			})
			.on('error', function(err){
				console.error("WTF???", err);
			})
			.on('end', function() { 
				console.log('query ended');
				client.end();
				res.render('waitingforverification',{locals: {'email': email}});
		    });			
		}
	});	
});

// ===========================================
//  Verification process
// ===========================================
app.get('/verify', isVerificationRequest, function(req, res){
});
var crypto = require('crypto');
var isVerificationRequest = function(req, res, next) {
	var acknowledgeToken = 'token';
	console.log('isVerificationRequest');
	if (typeof req.query[acknowledgeToken] != 'undefined'){
		var token = req.query[acknowledgeToken].trim();
		next();
	} else {
		next(new Error('Invalid toke'));
	}
}

// ===========================================
//  Administration dashboard
// ===========================================
app.get('/vormshall', /* insert admin middelware **/ function(req, res){
	var verificationsOnHold = [];
	console.log("Ask for verifications");
	initDatabase();
	dbClient.query('select token, ip from verifications')
	.on('row', function(row){
		console.log('Row:', row);
		verificationsOnHold.push(row);
	})
	.on('error',function(err){
		console.error(err);
	})
	.on('end',function(){
		console.log("End", verificationsOnHold);
		res.render('vormshall/dashboard',{
			locals:{
				'verificationsOnHold': verificationsOnHold
			}
		});
	});
});

// ===========================================
//  App initialization
// ===========================================
var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log('Listening on port: ' + port);
});

var dbClient = null;
var initDatabase = function(){
	var pg = require('pg');
	var dbUrl = process.env.DATABASE_URL || 'tcp://espdallo@localhost:5432/liggeran';
	pg.connect(dbUrl, function(err, client) {
		if (err){
			console.log(err);
		}
		console.log('Db initialized');
		dbClient = client;
		console.log('done');
/*		var query = client.query('SELECT * FROM reporters');
		query.on('row', function(row) {
			console.log(JSON.stringify(row));
		});*/
	});
};
initDatabase();
