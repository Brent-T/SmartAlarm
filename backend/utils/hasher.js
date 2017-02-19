/**
 *	Import modules
 *	---------------------------------------
 */
	
	const crypto = require('crypto');

/**
 *	Module exports
 *	---------------------------------------
 */

 	exports.hashPassword = (password) => hashPassword(password);
	exports.verifyPassword = (password, hashedPassword) => verifyPassword(password, hashedPassword);

/**
 *	Functions
 *	---------------------------------------
 */

	function verifyPassword(password, hashedPassword) {
		return (hashPassword(password) == hashedPassword);
	}

	function hashPassword(password) {
		return crypto.createHash('md5').update(password).digest("hex");
	}