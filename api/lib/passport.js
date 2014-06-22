'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var Farmer = require('../models/Farmer');

module.exports = function(passport) {
	passport.use('basic', new BasicStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},

	function(email, password, done) {
		Farmer.findOne({'basic.email': email}, function (err, user) {
			if(err) {
				return done(err);
			}

			if(!user) {
				return done(null, false);
			}

			if(!user.validPassword(password)) {
				return done(null, false);
			}

			return done(null, user);
		})
	}

	))
}