/**
 *	Module exports
 *	---------------------------------------
 */

	exports.checkLoginData = (email, password) => checkLoginData(email, password);
	exports.checkRegisterData = (firstname, surname, email, password) => checkRegisterData(firstname, surname, email, password);
	exports.checkGetAlarmsData = (user_id) => checkGetAlarmsData(user_id);
	exports.checkgetWakeupTimeAlarm = (alarm_id) => checkgetWakeupTimeAlarm(alarm_id);
	exports.checkAddAlarmData = (name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id) => checkAddAlarmData(name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id);
	exports.checkEditAlarmData = (id, name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id) => checkEditAlarmData(id, name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id);
	exports.checkDeleteAlarmData = (alarm_id) => checkGetAlarmsData(alarm_id);
	exports.checkToggleAlarmData = (alarm_id, status) => checkToggleAlarmData(alarm_id, status);

/**
 *	Functions
 *	---------------------------------------
 */

	function checkLoginData(email, password) {
		return ((email == undefined) || (password == undefined));
	}

	function checkRegisterData(firstname, surname, email, password) {
		return ((firstname == undefined) || (surname == undefined) || (email == undefined) || (password == undefined));
	}

	function checkGetAlarmsData(user_id) {
		return (user_id == undefined);
	}

	function checkAddAlarmData(name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id) {
		return ((name == undefined) || (arrival == undefined) || (start_location == undefined) || (end_location == undefined) || (transportation == undefined) || (prep_time == undefined) || (description == undefined) || (status == undefined) || (user_id == undefined));
	}

	function checkEditAlarmData(id, name, arrival, start_location, end_location, transportation, prep_time, description, status, user_id) {
		return ((id === undefined) || (name == undefined) || (arrival == undefined) || (start_location == undefined) || (end_location == undefined) || (transportation == undefined) || (prep_time == undefined) || (description == undefined) || (status == undefined) || (user_id == undefined));
	}
	
	function checkDeleteAlarmData(alarm_id) {
		return (alarm_id == undefined);
	}

	function checkToggleAlarmData(alarm_id, status) {
		return (alarm_id == undefined || status == undefined);
	}
	