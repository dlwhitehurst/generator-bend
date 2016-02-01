// ***************************************
// server.js
// 
// written by David L. Whitehurst
// January 28, 2106

// determines the config (development or production)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// always load mongoose config first
var mongoose = require('./config/mongoose'),
  express = require('./config/express');

var db = mongoose();
var app = express(); 

app.listen(3000);
module.exports = app;

if (process.env.NODE_ENV == 'development') {
	console.log('Server running in DEVELOPMENT-mode on http://localhost:3000 (unavailable to others)');
} else if (process.env.NODE_ENV == 'production') {
	console.log('Server running in PRODUCTION-mode on http://localhost:3000 (publicly available)')
} else {
	console.log('ERROR: Configuration is improperly set.');
}
