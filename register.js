var filename = process.argv[2];
var crypto = require('crypto');
var fs = require('fs');

var token = "espen.dallokke@finn.no";

console.log("token:" + token);
var shasum = crypto.createHash('sha1');
shasum.update(token);
var d = shasum.digest('hex');
console.log(d + '  ' + filename);