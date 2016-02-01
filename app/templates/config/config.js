// *************************************
// config.js 
//
// written by David L. Whitehurst
// January 28, 2016
// 
// This file sets which configuration we'll
// use for our environment based on NODE_ENV
//
// $ export NODE_ENV=development ... 
// or production
//
module.exports = require('./env/' + process.env.NODE_ENV + '.js');