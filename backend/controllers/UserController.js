/**
 *	Import modules
 *	---------------------------------------
 */
	
	const db = require('./../db/data_access.js');
	const hash = require('./../utils/hasher.js');
	const datachecker = require('./../utils/datachecker.js');

/**
 *	Module exports
 *	---------------------------------------
 */

	exports.login = (req, res) => login(req, res);
	exports.register = (req, res) => register(req, res);

/**
 *	Functions
 *	---------------------------------------
 */

 	/**
	 *	Login a user
	 *
	 *	@param email : string
	 *	@param password : string
	 *
	 *	@return User if credentials where correct
	 *	
	 */
	function login(req, res) {
		data = {
			email : req.body.email,
			password : req.body.password
		};

		if(datachecker.checkLoginData(data.email, data.password)) {
			res.status(400).send('Invalid data provided');
		}
		else {
			db.getUserByEmail(data.email, function(user) {
				if(user) {
					if(hash.verifyPassword(data.password, user.password)) {
						user.password = null;
						res.status(200).json(user);
					}
					else {
						res.status(401).send('Invalid credentials, password incorrect');	
					}
				}
				else {
					res.status(401).send('Invalid credentials, email incorrect');
				}
			});
		}
	}

	/**
	 *	Register a new user
	 *
	 *	@param firstname : string
	 * 	@param surname : string
	 *	@param email : string
	 *	@param password : string
	 *
	 *	@return Status code 200 with status message
	 *	
	 */
	function register(req, res) {
		data = {
			firstname : req.body.firstname,
			surname : req.body.surname,
			email : req.body.email,
			password : req.body.password
		};

		if(datachecker.checkRegisterData(data.firstname, data.surname, data.email, data.password)) {
			res.status(400).send('Invalid data provided');
		}
		else {
			db.addUser(data.firstname, data.surname, data.email, data.password, function(error) {
				if(!error) {
					res.status(201).send('User was added to database');
				}
				else {
					res.status(409).send('Error occured: ' + error);
				}
			});
		}
	}