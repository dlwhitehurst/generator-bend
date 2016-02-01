// ***************************************
// server.js
// 
// written by David L. Whitehurst
// January 28, 2106

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/*
 warning: always load the mongoose config first to provide
 every module after access to our model objects
*/
var mongoose = require('./config/mongoose'),
  express = require('./config/express');

var db = mongoose();
var app = express(); 

app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000');
