
exports.index = function(req, res){
	var db = require('app/db.js');
	console.log(db);
	res.render('index', { title: 'Hvordan ligger du an?' });
};