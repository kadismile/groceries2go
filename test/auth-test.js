const server = require("../server");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const User = require('../models/User');

beforeEach(function () {

});

afterEach(function () {

});

let authDetails = {
  "email": "churchofgod@yahoo.com",
  "password": "111222",
};

exports.authTest = () =>
    describe("Describe the basic nature of Tests for authentication", () => {
      
      it("Must Be authenticated", done => {
        chai
            .request(server)
            .post("/api/v1/auth/login")
            .send(authDetails)
            .then( async (res) => {
              chai.expect(res.status).to.eql(200); // expression which will be true if response status equal to 201
              chai.assert.exists(res.body.token); // assertion expression which will be true if id exists
              done();
            })
            .catch(done);
      });
      
    });
