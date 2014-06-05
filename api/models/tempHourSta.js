var mongoose = require('mongoose');

var tempHourStaSchema = new mongoose.Schema({
	StationID: Number,
	Date: String,
	Hour: Number,
	Temp: Number
});

module.exports = mongoose.model('hourly_temps', tempHourStaSchema);
