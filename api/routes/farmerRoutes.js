'use strict';

var Farmer = require('../models/Farmer');

module.exports = function(app, passport) {

    app.post('/api/v0_0_1/farmers', function (req, res) {

        Farmer.findOne({ 'basic.email': req.body.email}, function (err, user) {

            if(err) {
                req.send(500, err);
                return false;
            }

            if(user) {
                res.send(401, {'msg': 'A user with that email already exists'});
                return false;
            }

            var newUser = new Farmer({});
            newUser.basic.email = req.body.email;
            newUser.basic.password = newUser.generateHash(req.body.password);
            newUser.admin = false;

            newUser.save(function(err, resNewUser) {
                if(err) {
                    res.send(500, err);
                    return false;
                };
                
                res.json({'jwt_token': resNewUser.createToken(app)});

            });
        });
    });

    app.get('/api/v0_0_1/farmers',
        passport.authenticate('basic', {session: false}),
        function (req, res) {
            res.json({'jwt_token': req.user.createToken(app)});
        }
    );
};