// *************************************
// index.server.controller.js
//
// written by David L. Whitehurst
// January 28, 2016

exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
	
	req.session.lastVisit = new Date();
    
	var sess = req.session
    if (sess.views) {
		sess.views++;
    } else {
      sess.views = 1
    }
	
	res.render('index', {
		title: 'Hello World Dynamic',
		views: sess.views
	})
}