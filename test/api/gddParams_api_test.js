var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
var app = require('../../server.js').app;

//Variables needed for testing GDD params
var cropArray = ["corn", "wheat", "rice", "beans", "tomato", "barley", "beats", "celery"];
var cropType = cropArray[ (Math.round((Math.random()*(7)))) ];

//Variables needed for authentication
var email;
var password;
var jwt_token;

describe('GDD params api', function () {


    it('can succesfully create a new GDD params', function (done) {

        email = 'kevinmstephens' + parseInt(Math.random()*100) + '@gmail.com';
        password = 'pwpwpw' + parseInt(Math.random()*100) + '!';

        var t1 = parseInt(Math.random() * (110 - 48) + 48);
        var t2 = parseInt(Math.random() * (110 - 48) + 48);

        var postURL = 'http://localhost:3000/api/v0_0_1/gddParams/' + cropType + "/" + t1 + "/" + t2;

        superagent.post(postURL)
                .end(function (err, res) {
                  expect(res.status).to.equal(200);
                  done();
                });
    });


    it('can successfully retrieve default GDD params for a specifc crop', function (done){
        var getURL = 'http://localhost:3000/api/v0_0_1/gddParams/' + cropType;

        superagent.get(getURL)
                .end(function (err, res) {
                  expect(res.status).to.equal(200);
                  done();
                });
    });


    it('gets an error when a crop does not exist', function (done){
        var getURL = 'http://localhost:3000/api/v0_0_1/gddParams/crapcrop';

        superagent.get(getURL)
                .end(function (err, res) {
                  console.log("crop doesnt exist status: " + res.status);
                  expect(res.status).to.equal(401);
                  done();
                });
    });

});
