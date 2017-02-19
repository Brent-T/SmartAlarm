/**
 *	Import modules
 *	---------------------------------------
 */
	
	const db = require('./../db/data_access.js');
	const hash = require('./../utils/hasher.js');
	const datachecker = require('./../utils/datachecker.js');
	const googleMaps = require('./../utils/googleMaps.js');
	const moment = require('moment');

/**
 *	Module exports
 *	---------------------------------------
 */

	exports.getAllAlarms = (req, res) => getAllAlarms(req, res);
	exports.getWakeupTimeAlarm = (req, res) => getWakeupTimeAlarm(req, res);
	exports.addAlarm = (req, res) => addAlarm(req, res);
	exports.editAlarm = (req, res) => editAlarm(req, res);
	exports.deleteAlarm = (req, res) => deleteAlarm(req, res);
	exports.toggleAlarm = (req, res) => toggleAlarm(req, res);

/**
 *	Functions
 *	---------------------------------------
 */

 	/**
	 *	Get alarms for user
	 *
	 *	@param user : int
	 *
	 *	@return All alarms of given user
	 *	
	 */
	function getAllAlarms(req, res) {
		user_id = req.query.user;

		if(datachecker.checkGetAlarmsData(user_id)) {
			res.status(400).send('Invalid data provided');
		}
		else {
			if(user_id <= 0) {
				res.status(400).send('Invalid user id');
			}
			else {
				db.getAlarmsForUser(user_id, function(alarms) {
					var counter = 0;
					if(alarms.length === 0) res.status(200).json(alarms);
					alarms.forEach(function(alarm) {

						// Counter strange time conversion
						alarm.arrival = moment(alarm.arrival);//.add(1, 'hours');

						// Add wake up params
						getWakeupTimeAlarm(alarm, function(result) {
							alarm.wake_up = result;
							counter++;
							if(counter === alarms.length) {
								res.status(200).json(alarms);
							}
						});						
					});
				});
			}
		}
	}

	/**
	 *	Get wake up time for alarm
	 *
	 *	@param alarm : alarm
	 *
	 *	@return Wake up time for alarm
	 *	
	 */
	function getWakeupTimeAlarm(alarm, callback) {
		// Ask google maps for duration
		googleMaps.getDurationInTraffic(alarm.start_location, alarm.end_location, alarm.transportation.toLowerCase(), function(trip_duration) {
			let trip_time = calculateWakeUpTime(alarm.prep_time, trip_duration, alarm.arrival);
			callback(trip_time);
		});
	}

	function calculateWakeUpTime(prep_time, trip_duration, arrival_time) {		
		var datetime = moment(arrival_time);
		datetime.subtract((prep_time + trip_duration), 'minutes');
		return datetime;
	}

	/**
	 *	Add alarm for user
	 *
	 *	@param name : string
	 *	@param arrival : datetime
	 *	@param start_location : string
	 *	@param end_location : string
	 *	@param transportation : string
	 *	@param prep_time : string
	 *	@param description : string
	 *	@param status : boolean
	 *	@param user_id : int
	 *
	 *	@return Status message
	 *	
	 */
	function addAlarm(req, res) {
		data = {
			name : req.body.name,
			arrival : req.body.arrival,
			start_location : req.body.start_location,
			end_location : req.body.end_location,
			transportation : req.body.transportation,
			prep_time : req.body.prep_time,
			description : req.body.description,
			status : req.body.status,
			user_id : req.body.user_id
		};

		if(datachecker.checkAddAlarmData(data.name, data.arrival, data.start_location, data.end_location, data.transportation, data.prep_time, data.description, data.status, data.user_id)) {
			res.status(400).send('Invalid data provided');
		}
		else {
			db.addAlarm(data.name, data.arrival, data.start_location, data.end_location, data.transportation, data.prep_time, data.description, data.status, data.user_id);
			res.status(200).send('Alarm was added');
		}
	}

	/**
	 *	Edit alarm of user
	 *
	 *	@param id : int
	 *	@param name : string
	 *	@param arrival : datetime
	 *	@param start_location : string
	 *	@param end_location : string
	 *	@param transportation : string
	 *	@param prep_time : string
	 *	@param description : string
	 *	@param status : boolean
	 *	@param user_id : int
	 *
	 *	@return Status message
	 *	
	 */
	function editAlarm(req, res) {
		data = {
			id : req.body.id,
			name : req.body.name,
			arrival : req.body.arrival,
			start_location : req.body.start_location,
			end_location : req.body.end_location,
			transportation : req.body.transportation,
			prep_time : req.body.prep_time,
			description : req.body.description,
			status : req.body.status,
			user_id : req.body.user_id
		};

		if(datachecker.checkEditAlarmData(data.id, data.name, data.arrival, data.start_location, data.end_location, data.transportation, data.prep_time, data.description, data.status, data.user_id)) {
			res.status(400).send('Invalid data provided');
		}
		else {
			db.editAlarm(data.id, data.name, data.arrival, data.start_location, data.end_location, data.transportation, data.prep_time, data.description, data.status, data.user_id);
			res.status(200).send('Alarm was updated');
		}
	}

	/**
	 *	Delete an alarm
	 *
	 *	@param alarm : int
	 *
	 *	@return Status message
	 *	
	 */
	function deleteAlarm(req, res) {
		data = {
			alarm_id : req.body.alarm
		};

		if(datachecker.checkDeleteAlarmData(data.alarm_id)) {
			res.status(400).send('Invalid data provided');
		}
		else {
			db.deleteAlarm(data.alarm_id);
			res.status(200).send('Alarm was deleted');
		}
	}

	/**
	 *	Toggle an alarm
	 *
	 *	@param alarm : int
	 *	@param status : boolean
	 *
	 *	@return Status message
	 *	
	 */
	function toggleAlarm(req, res) {
		data = {
			alarm_id : req.body.alarm,
			status : req.body.status
		};

		if(datachecker.checkToggleAlarmData(data.alarm_id, data.status)) {
			res.status(400).send('Invalid data provided');
		}
		else {
			db.toggleAlarm(data.alarm_id, data.status);
			res.status(200).send('Alarm status was updated');
		}
	}