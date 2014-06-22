'use strict';

var Farmer = require('../models/Farmer');
var jwt = require('jwt-simple');

module.exports = function (app) {

	var jwtauth = {};

	jwtauth.auth = function(req, res, next) {


		var token = req.headers.jwt_token;

		if (token) {
			try {
				var decoded = jwt.decode(token, app.get('jwtTokenSecret'));


				Farmer.findOne({'_id': decoded.iss}, function(err, farmer) {
					if(err) { return res.send(500, err); }

					if(new Date(decoded.expires).getTime() < new Date().getTime()){
						{
							return res.send(401, { 'msg': 'expired token'});
						}
					};

					//perform if token is accepted
					req.farmer = farmer;
					return next();

				});
			} catch (err) {
				return res.send(500);
				// log the error...
			}
		} else {
			return res.send(401, {'msg': 'no access token found'});
		}
	};

	return jwtauth;
};
