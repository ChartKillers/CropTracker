var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');
var Schema = mongoose.Schema;


var farmerSchema = new Schema({

  name: { firstName: String, lastName: String },
  //username: String,
  basic: {
    email: String,
    password: String
  },

  plantings: [{
    cropType: String,
    cropVariety: String,
    plantingDate: Date,
    fieldName: String,
    stationId: Number,
    gddParameters: {
      maxTempF: Number,
      minTempF: Number
    }
  }]
});

farmerSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

farmerSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.basic.password);
};

farmerSchema.methods.createToken = function (app) {
  var expires = moment().add('days', 7).valueOf();
  var that = this;
  var token = jwt.encode({
    iss: that._id,
    expires: expires
  }, app.get('jwtTokenSecret'));
  return token;
};

module.exports = mongoose.model('farmers', farmerSchema);
