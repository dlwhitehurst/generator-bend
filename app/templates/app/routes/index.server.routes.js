// ************************************
// index.server.routes.js
//
// written by David L. Whitehurst
// January 28, 2016

module.exports = function(app) {
	var index = require('../controllers/index.server.controller');
	app.get('/', index.render);
}