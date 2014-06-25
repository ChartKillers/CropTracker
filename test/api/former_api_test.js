var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
var app = require('../../server.js').app;


var email;
var password;
var jwt_token;
var adminToken;
var planting;
var plantingNum = Math.round(Math.random()*1000);

describe('Farmer account api', function () {


    it('can succesfully create a new user', function (done) {

        email = 'kevinmstephens' + parseInt(Math.random()*1000) + '@gmail.com';
        password = 'pwpwpw' + parseInt(Math.random()*100) + '!';
        console.log(email);
        console.log(password);

        superagent.post('http://localhost:3000/api/v0_0_1/farmers')
                .send({
                    email: email,
                    password: password,
                    plantings: []

                })
                .end(function (err, res) {
                    jwt_token = res.body.jwt_token;
                    expect(err).to.be.null;
                    expect(res.body.jwt_token).to.not.be.null;
                    done();
                });
    });

    // it('cant create user that already exists', function (done) {
    //     superagent.post('http://localhost:3000/api/v0_0_1/farmers')
    //             .send({
    //                 email: email,
    //                 password: 'abldags'
    //             })
    //             .end(function (err, res) {
    //                 expect(err).to.be.null;
    //                 console.log("wrong password status: " + res.status);
    //                 expect(res.status).to.equal(401);
    //                 expect(res.body.msg).to.be.a('string');
    //                 done();
    //             });
    // });
    //
    // it('will assign a new token when user re-authenticates', function (done) {
    //
    //     superagent.get('http://localhost:3000/api/v0_0_1/farmers')
    //             .auth(email, password)
    //             .end(function (err, res) {
    //                 expect(err).to.be.null;
    //                 expect(res.body.jwt_token).to.be.a('string');
    //                 expect(res.body.jwt_token).to.not.equal(jwt_token);
    //                 done();
    //             });
    // });
    //
    // it('will reject bad password for existing user', function (done) {
    //
    //     superagent.get('http://localhost:3000/api/v0_0_1/farmers')
    //             .auth(email, 'badpassword')
    //             .end(function (err, res) {
    //                 expect(err).to.be.null;
    //                 expect(res.body.jwt_token).to.be.undefined;
    //                 console.log("bad password status: " + res.status);
    //                 expect(res.status).to.equal(401);
    //                 done();
    //     });
    // });
});

describe('Gdd transform api', function () {

  this.timeout(15000);
  var date1 = new Date(2014, 3, 3, 3, 3, 3, 4);
  var date2 = new Date(2014, 4, 4, 4, 4, 4, 4);

  it('farmer will add a new planting', function (done) {
        superagent.post('http://localhost:3000/api/v0_0_1/farmers/plantings')
                .send( {
                    cropType : 'corn',
                    cropVariety : 'popcorn',
                    plantingDate : date1,
                    fieldName : 'magic field 7',
                    stationId : 240,
                    maxTempF : 86,
                    minTempF : 50
                })
                .set('jwt_token', jwt_token)
                .end(function (err, res) {
                  expect(res.status).to.equal(200);
                  done();
                });


  });

  it('farmer will add a second planting', function (done) {
        superagent.post('http://localhost:3000/api/v0_0_1/farmers/plantings')
                .send( {
                    cropType : 'rice',
                    cropVariety : 'megarice',
                    plantingDate : date2,
                    fieldName : 'magic field 13',
                    stationId : 240,
                    maxTempF : 90,
                    minTempF : 55
                })
                .set('jwt_token', jwt_token)
                .end(function (err, res) {
                  expect(res.status).to.equal(200);
                  done();
                });


  });


  it('can successfully retrieve platings for a specific farmer', function (done){
      superagent.get('http://localhost:3000/api/v0_0_1/farmers/plantings')
              .auth(email, password)
              .set('jwt_token', jwt_token)
              .end(function (err, res) {
                expect(res.status).to.equal(200);
                planting = res.body;
                done();
              });
  });


  it('can successfully retrieve gdd transform for a specific farmer', function (done){
      var PID = planting[1]._id;
      var getURL = 'http://localhost:3000/api/v0_0_1/daily-cum-gdd/' + PID;

      console.log(getURL);

      superagent.get(getURL)
              .auth(email, password)
              .set('jwt_token', jwt_token)
              .end(function (err, res) {
                expect(res.status).to.equal(200);
                console.log(res.body);
                done();
              });

  });



}
);
