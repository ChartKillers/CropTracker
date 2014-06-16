var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gddParamsSchema = new Schema({
    cropType: String,
    gddParameters: {
      maxTempF: Number,
      minTempF: Number
    }
});

module.exports = mongoose.model('default_crops', gddParamsSchema)
