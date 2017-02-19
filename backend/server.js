/**
 *	Import modules
 *	---------------------------------------
 */

	const express = require('express');
	const bodyParser = require('body-parser');	
	const UserController = require('./controllers/UserController.js');
	const AlarmController = require('./controllers/AlarmController.js');

/**
 *	App config
 *	---------------------------------------
 */

	const app = express();
	app.use(bodyParser.json());

	// Add headers
	app.use(function (req, res, next) {
	    res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Headers', 'content-type');
	    next();
	});

/**
 *	User routes
 *	---------------------------------------
 */

	/**
	 *	Login a user
	 */
	app.post('/login', function(req, res) {
		UserController.login(req, res);
	});

	/**
	 *	Register a new user
	 */
	app.post('/register', function(req, res) {
		UserController.register(req, res);
	});

/**
 *	Alarm routes
 *	---------------------------------------
 */

	/**
	 *	Get alarms for user
	 */
	app.get('/alarms', function(req, res) {
		AlarmController.getAllAlarms(req, res);
	});

	/**
	 *	Add alarm for user
	 */
	app.post('/addAlarm', function(req, res) {
		AlarmController.addAlarm(req, res);		
	});

	/**
	 *	Edit alarm of user
	 */
	app.post('/editAlarm', function(req, res) {
		AlarmController.editAlarm(req, res);		
	});

	/**
	 *	Delete an alarm
	 */
	app.post('/deleteAlarm', function(req, res) {
		AlarmController.deleteAlarm(req, res);		
	});

	/**
	 *	Toggle an alarm
	 */
	app.post('/toggleAlarm', function(req, res) {
		AlarmController.toggleAlarm(req, res);		
	});

/**
 *	Start server
 *	---------------------------------------
 */

	const server = app.listen(5050, function() {
		let host = server.address().address
		let port = server.address().port

		console.log('Node server started');
	});
