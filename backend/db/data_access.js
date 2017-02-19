/**
 *	Import modules
 *	---------------------------------------
 */

	const Sequelize = require('sequelize');
	const hash = require('./../utils/hasher.js');

/**
 *	Database config
 *	---------------------------------------
 */

	const sequelize = new Sequelize('smartalarm', 'root', 'Azerty123', {
		timezone: 'Europe/Paris'
	});

/**
 *	Models
 *	---------------------------------------
 */

	const User = sequelize.define('users', {
		id: {
			type: Sequelize.INTEGER,
			field: 'id',
			primaryKey: true,
			autoIncrement: true
		},
		firstname: {
			type: Sequelize.STRING,
			field: 'firstname'
		},
		surname: {
			type: Sequelize.STRING,
			field: 'surname'
		},
		email: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		}
	}, 
	{
		freezeTableName: true
	});

	const Alarm = sequelize.define('alarms', {
		id: {
			type: Sequelize.INTEGER,
			field: 'id',
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			field: 'name'
		},
		arrival: {
			type: Sequelize.DATE
		},
		start_location: {
			type: Sequelize.STRING
		},
		end_location: {
			type: Sequelize.STRING
		},
		transportation: {
			type: Sequelize.STRING
		},
		prep_time: {
			type: Sequelize.INTEGER
		},
		description: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.BOOLEAN
		}
	},
	{
		freezeTableName: true
	});

	User.hasMany(Alarm, {as : 'Alarms', foreignKey: 'user_id'});

/**
 *	Module exports
 *	---------------------------------------
 */

	exports.getUserByEmail = (email, callback) => getUserByEmail(email, callback);
	exports.addUser = (firstname, surname, email, password, callback) => addUser(firstname, surname, email, password, callback);
	exports.getAlarmsForUser = (user_id, callback) => getAlarmsForUser(user_id, callback);
	exports.addAlarm = (name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id) => addAlarm(name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id);
	exports.editAlarm = (name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id) => editAlarm(name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id);
	exports.deleteAlarm = (alarm_id) => deleteAlarm(alarm_id);
	exports.toggleAlarm = (alarm_id, status) => toggleAlarm(alarm_id, status);

/**
 *	Functions
 *	---------------------------------------
 */

	function getUserByEmail(email, callback) {
		User.findAll({
			where: { email : email },
			raw: true
		}).then(function(users) {
			callback(users[0]);
		});
	}

	function addUser(firstname, surname, email, password, callback) {
		User.findAll({
			where: { email : email }
		}).then(function(users) {
			if(users.length == 0) {
				User.build({
					firstname: firstname,
					surname: surname,
					email: email,
					password: hash.hashPassword(password)
				}).save();
				callback();
			}
			else {
				callback('Email is already in use');
			}
		});
	}

	function getAlarmsForUser(user_id, callback) {
		Alarm.findAll({
			where: { 
				user_id : user_id,
				arrival: {
					$gte: new Date()
				}
			},
  			raw: true
		}).then(function(alarms) {
			callback(alarms);
		});
	}

	function addAlarm(name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id) {
		Alarm.build({
			name: name,
			arrival: arrival,
			start_location: start_location,
			end_location: end_location,
			transportation : transportation,
			prep_time: prep_time,
			description: description,
			status: status,
			user_id: user_id
		}).save();
	}

	function editAlarm(id, name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id) {
		Alarm.findOne({
			where: {
				id : id
			}
		}).then(function(alarm) {
			if(alarm) {
				alarm.name = name;
				alarm.arrival = arrival;
				alarm.start_location = start_location;
				alarm.end_location = end_location;
				alarm.transportation = transportation;
				alarm.prep_time = prep_time;
				alarm.description = description;
				alarm.status = status;
				alarm.user_id = user_id;
				alarm.save();
			}
		});
	}

	function deleteAlarm(alarm_id) {
		Alarm.destroy({
			where: {
				id : alarm_id
			}
		});
	}

	function toggleAlarm(alarm_id, status) {
		Alarm.findOne({
			where: {
				id : alarm_id
			}
		}).then(function(alarm) {
			if(alarm) {
				alarm.status = status;
				alarm.save();
			}
		});
	}