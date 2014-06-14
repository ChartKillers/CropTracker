var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var farmerSchema = new Schema({

  userInfo: {
    name: { firstName: String, lastName: String },
    //username: String,
    email: String,
    password: String
  },

  plantings: [{
    _id: Number,
    cropType: String,
    cropVariety: String,
    plantingDate: Date,
    stationId: Number,
    gddParameters: {
      maxTempF: Number,
      minTempF: Number
    }
  }]

});

module.exports = mongoose.model('farmers', farmerSchema);
