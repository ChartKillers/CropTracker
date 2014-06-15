var mongoose = require('mongoose');

var tempHourStaSchema = new mongoose.Schema({
	stationId: Number,
	date: Date,
	maxTempF: Number,
	minTempF: Number
});

module.exports = mongoose.model('daily_max_min_temps', tempHourStaSchema);