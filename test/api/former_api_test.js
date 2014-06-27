var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
var app = require('../../server.js').app;


var email;
var password;
var jwt_token;
var adminToken;
var plantings;
var plantingNum = Math.round(Math.random()*1000);

describe('Farmer account api', function () {


    it('can succesfully create a new user', function (done) {

        email = 'kevinmstephens' + parseInt(Math.random()*1000) + '@gmail.com';
        password = 'pwpwpw' + parseInt(Math.random()*100) + '!';
        console.log("[TEST] Successfully created farmer with the following credentials: ")
        console.log("      EMAIL: " + email);
        console.log("      PWD: " + password);

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
  var date2 = new Date(2014, 1, 1, 1, 1, 1, 1);
  var currentDate = new Date();

  it('farmer will add a new planting', function (done) {
        superagent.post('http://localhost:3000/api/v0_0_1/farmers/plantings')
                .send( {
                    cropType : 'corn',
                    cropVariety : 'popcorn',
                    plantingDate : date1,
                    fieldName : 'magic field 7' + parseInt(Math.random()*1000),
                    stationId : 240,
                    gddParameters : {
                      maxTempF : 86,
                      minTempF : 50,
                    },
                    lastUpdated : date1,
                    lastCumGdd : 0
                })
                .set('jwt_token', jwt_token)
                .end(function (err, res) {
                  console.log("[TEST] First planting added status = " + res.status);
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
                    fieldName : 'magic field 13' + parseInt(Math.random()*1000),
                    stationId : 666,
                    gddParameters : {
                      maxTempF : 90,
                      minTempF : 55,
                    },
                    lastUpdated : date2,
                    lastCumGdd : 0
                })
                .set('jwt_token', jwt_token)
                .end(function (err, res) {
                  console.log("[TEST] Second planting added status = " + res.status);
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
                console.log("[TEST] Plantings retrive status = " + res.status);
                plantings = res.body;
                console.log("      PID #1 = " + plantings[0]._id);
                console.log("      PID #2 = " + plantings[1]._id);
                console.log("      PID #3 = (should be undefined) = " + plantings[2]);
                done();
              });
  });


  it('can successfully retrieve gdd transform for a specific farmer', function (done){
      var PID = plantings[1]._id;
      var getURL = 'http://localhost:3000/api/v0_0_1/daily-cum-gdd/' + PID;
      superagent.get(getURL)
              .auth(email, password)
              .set('jwt_token', jwt_token)
              .end(function (err, res) {
                expect(res.status).to.equal(200);
                console.log("[TEST] GDD calc status " + res.status + " route at this URL: ");
                console.log(getURL);
                console.log("GDD values should be null for station #666: ");
                console.log(res.body);
                done();
              });

  });

  it('farmer will update his second planting', function (done) {
        var PID = plantings[1]._id;
        var putURL = 'http://localhost:3000/api/v0_0_1/farmers/plantings/' + PID;

        superagent.post(putURL)
                .send( {
                    cropType : 'rice',
                    cropVariety : 'megarice',
                    plantingDate : date2,
                    fieldName : 'magic field ' + parseInt(Math.random()*1000),
                    stationId : 238,
                    gddParameters : {
                      maxTempF : 98,
                      minTempF : 56,
                    },
                    lastUpdated : currentDate,
                    lastCumGdd : 0
                })
                .set('jwt_token', jwt_token)
                .end(function (err, res) {
                  plantings = res.body.plantings;
                  console.log("[TEST] Farmer updated planting, new ID is: ");
                  console.log(plantings[(plantings.length - 1)]._id);
                  expect(res.status).to.equal(200);
                  done();
                });

  });

  it('can successfully retrieve gdd transform for a specific farmer', function (done){
      var PID = plantings[(plantings.length - 1)]._id;
      var getURL = 'http://localhost:3000/api/v0_0_1/daily-cum-gdd/' + PID;

      console.log(getURL);

      superagent.get(getURL)
              .auth(email, password)
              .set('jwt_token', jwt_token)
              .end(function (err, res) {
                expect(res.status).to.equal(200);
                console.log("DATE ARRAY LENGTH: " + res.body.date.length);
                console.log("GDD ARRAY LENGTH: " + res.body.gdd.length);
                console.log("CUM ARRAY LENGTH: " + res.body.cum.length);
                console.log(res.body.gdd[res.body.gdd.length - 1]);
                console.log(res.body.gdd);
                done();
              });

  });


}
);
