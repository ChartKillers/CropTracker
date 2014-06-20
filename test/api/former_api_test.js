var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
var app = require('../../server.js').app;


var email;
var password;
var jwt_token;
var adminToken;

describe('Farmer account api', function () {


    it('can succesfully create a new user', function (done) {

        email = 'kevinmstephens' + parseInt(Math.random()*100) + '@gmail.com';
        password = 'pwpwpw' + parseInt(Math.random()*100) + '!';

        superagent.post('http://localhost:3000/api/v0_0_1/farmers')
                .send({
                    email: email,
                    password: password

                })
                .end(function (err, res) {
                    jwt_token = res.body.jwt_token;
                    expect(err).to.be.null;
                    expect(res.body.jwt_token).to.not.be.null;
                    done();
                });
    });

    it('cant create user that already exists', function (done) {
        superagent.post('http://localhost:3000/api/v0_0_1/farmers')
                .send({
                    email: email,
                    password: 'abldags'
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.status).to.equal(401);
                    expect(res.body.msg).to.be.a('string');
                    done();
                });
    });

    it('will assign a new token when user re-authenticates', function (done) {

        superagent.get('http://localhost:3000/api/v0_0_1/farmers')
                .auth(email, password)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.body.jwt_token).to.be.a('string');
                    expect(res.body.jwt_token).to.not.equal(jwt_token);
                    done();
                });
    });

    it('will reject bad password for existing user', function (done) {

        superagent.get('http://localhost:3000/api/v0_0_1/farmers')
                .auth(email, 'badpassword')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.body.jwt_token).to.be.undefined;
                    expect(res.status).to.equal(401);
                    done();
        });
    });
});

describe('Gdd transform api', function () {

  it('farmer will add a new planting', function (done) {
        superagent.post('http://localhost:3000/api/v0_0_1/farmers/plantings')
                .send( {
                    cropType : 'corn',
                    cropVariety : 'popcorn',
                    plantingDate : '10-4-2014',
                    stationId : 235,
                    gddParameters : {
                      maxTempF : 86,
                      minTempF : 50
                    }
                })
                .set('jwt_token', jwt_token)
                .end(function (err, res) {
                  expect(res.status).to.equal(200);
                  done();
                })


  })

  it('farmer will add a second planting', function (done) {
        superagent.post('http://localhost:3000/api/v0_0_1/farmers/plantings')
                .send( {
                    cropType : 'rice',
                    cropVariety : 'megarice',
                    plantingDate : '15-4-2014',
                    stationId : 235,
                    gddParameters : {
                      maxTempF : 90,
                      minTempF : 55
                    }
                })
                .set('jwt_token', jwt_token)
                .end(function (err, res) {
                  expect(res.status).to.equal(200);
                  done();
                })


  })

}
)
