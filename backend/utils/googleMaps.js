/**
 *	Const
 *	---------------------------------------
 */

	const API_KEY = 'AIzaSyBlz5VB1OSNTAisk_Vvl8ee8qBHG1nVmXw';

/**
 *	Import modules
 *	---------------------------------------
 */
	
	var googleMapsClient = require('@google/maps').createClient({
		key : API_KEY 
	});	

/**
 *	Module exports
 *	---------------------------------------
 */

	exports.getDurationInTraffic = (origin, destination, transportation, callback) => getDurationInTraffic(origin, destination, transportation, callback);

/**
 *	Functions
 *	---------------------------------------
 */

	function getDurationInTraffic(origin, destination, transportation, callback) {
		googleMapsClient.distanceMatrix({
				origins : [
					origin
				],
				destinations : [
					destination
				],
				mode : transportation,
				departure_time : new Date()
			}, 
			function(err, res) {
				if (!err) {
					var duration_in_seconds = findDurationInTrafficValue(res, transportation);
					callback(convertSecondsToMinutes(duration_in_seconds));
				}
			}
		);
	}

	function findDurationInTrafficValue(res, transportation) {
		let element = res.json.rows[0].elements[0];
		if(element.status !== 'ZERO_RESULTS') {
			if(transportation === 'driving') {
				return element.duration_in_traffic.value;
			}
			else {
				return element.duration.value;
			}
		}
		else {
			return 0;
		}
	}

	function convertSecondsToMinutes(seconds) {
		return Math.ceil(seconds/60);
	}

