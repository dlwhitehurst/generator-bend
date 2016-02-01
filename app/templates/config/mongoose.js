var config = require('./config'),
   mongoose = require('mongoose');
   
   module.exports = function() {
	   var db = mongoose.connect(config.db);
	   
	   // register schema models here
	   require('../app/models/user.server.model');
	   
	   // let our administrator know we're connected
	   console.log('Connected to mongodb://localhost:27017/mean-book');
	   
	   // return our database connection
	   return db;
   }