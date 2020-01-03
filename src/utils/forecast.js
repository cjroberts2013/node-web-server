const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url =
		"https://api.darksky.net/forecast/43d628f35fc3d59c4d799d2da28f4075/" +
		latitude +
		"," +
		longitude +
		"?units=us";

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to the weather service!", undefined);
		} else if (body.error) {
			callback("Unable to find location.", undefined);
		} else {
			callback(
				undefined,
				body.daily.data[0].summary +
					" It is currently " +
					body.currently.temperature +
					" degrees out. There is a " +
					Math.floor(body.currently.precipProbability * 100) +
					"% chance of rain. The current wind speed is " +
					body.currently.windSpeed +
					"mph!"
			);
		}
	});
};

module.exports = forecast;
