'use strict';

var Farmer = require('../models/Farmer');
var dateStringToDate = require('../../app/js/dateStringToDate');
var gddCalc = require('../../app/js/runGddCalc');
var getRubyParams = require('../../app/js/getRubyServerParams');

module.exports = function(app, passport, jwtauth) {

    app.post('/api/v0_0_1/farmers/plantings', jwtauth, function (req, res) {

      var newPlanting = req.body;

      req.farmer.plantings.push(newPlanting);
      req.farmer.save(function(err) {
        if (err) { return res.send(500, err); }
        res.send(req.farmer);
      });

    });

    app.post('/api/v0_0_1/farmers/plantings/:planting_id', jwtauth, function (req, res) {

      var params = getRubyParams(req.farmer, req.params.planting_id);
      var X = req.farmer.plantings.indexOf(params[1]);

      req.farmer.plantings.splice(X, 1);

      var newPlanting = req.body;

      req.farmer.plantings.push(newPlanting);
      req.farmer.save(function(err) {
        if (err) { return res.send(500, err); }
        res.send(req.farmer);
      });
    });

    app.post('/api/v0_0_1/farmers', function (req, res) {

        Farmer.findOne({ 'basic.email': req.body.email}, function (err, user) {

            if(err) {
                req.send(500, err);
                return false;
            }

            if(user) {
                res.send(409, {'msg': 'A user with that email already exists'});
                return false;
            }

            var newUser = new Farmer({});

            newUser.basic.email = req.body.email;
            newUser.basic.password = newUser.generateHash(req.body.password);
            newUser.defaultCimisId = req.body.defaultCimisId;
            newUser.admin = false;
            newUser.plantings = [];
            newUser.company = req.body.company;
            newUser.name = {
              firstName: req.body.firstName,
              lastName: req.body.lastName
            };

            newUser.save(function(err, resNewUser) {
                if(err) {
                    res.send(500, err);
                    return false;
                }

                res.json({'jwt_token': resNewUser.createToken(app)});

            });
        });
    });

    app.get('/api/v0_0_1/farmers',
        passport.authenticate('basic', {
          session: false,
          failureRedirect: '/#/login'
        }),
        function (req, res) {
            res.json({'jwt_token': req.user.createToken(app)});
        }
    );

    app.get('/api/v0_0_1/farmers/data', jwtauth, function (req, res) {
      res.send(req.farmer);
    });

    //GET route for getting all plantings documents for authed farmer
    app.get('/api/v0_0_1/farmers/plantings', jwtauth, function(req, res){

      res.send(req.farmer.plantings);

      // Farmer.find({}, function (err, farmer) {
      //
      //     if(err) { return res.send(500, err); }
      //
      //     if(!farmer) {
      //         res.send(401, {'msg': 'This farmer does not exist'});
      //         return false;
      //     }
      //
      //     console.log(farmer);
      //     console.log(farmer.plantings);
      //     console.log(req.farmer.plantings);
      //     console.log(farmer.basic);
      //     res.send(farmer.plantings);
      // });
    });

}
