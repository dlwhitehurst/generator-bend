// *****************************************
// development.js
// 
// written by David L. Whitehurst
// January 28, 2016
//
// This file is used to set configuration options
// for development. We can control the use of this
// file via NODE_ENV e.g. development
// 
// $ export NODE_ENV=development
//

module.exports = {
  // development options
	db: 'mongodb://localhost/mean-book',
	sessionSecret: 'developmentMumboJumbo'
};
