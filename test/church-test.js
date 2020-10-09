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

let church = {
  "_id": "K7NXaUYI99ZALlMPKg",
  "email": "churchofgod@yahoo.com",
  "name": "Church of God",
  "phoneNumber": "07067875047",
  "address": {
    "country": "Nigeria",
    "fullAddress": "Area 1 Garki Abuja",
    "countryCode": "NG",
    "longitude": 5.6087561,
    "latitude": 6.2691626
  },
  "password": "111222",
  "roles": ["superAdmin"],
  "maritalStatus": "married",
  "dob": "1989-05-10 10:28:12.240Z",
  "gender": "male",
  "category": {
    "name": "superAdmin"
  },
  "superAdmin": true
};
let token;
exports.churchTest = () =>
    describe("Describe the basic nature of Tests for church", () => {
      
      it("Creates a Church", done => {
        chai
            .request(server)
            .post("/api/v1/auth/church/register")
            .send(church)
            .then( async (res) => {
              chai.expect(res.status).to.eql(201); // expression which will be true if response status equal to 201
              chai.assert.exists(res.body.data._id); // assertion expression which will be true if id exists
              done();
            })
            .catch(done);
      });
  
      it("Gets Auth token", done => {
        const { email, password } = church;
        chai
            .request(server)
            .post("/api/v1/auth/login")
            .send({ email, password })
            .then((res) => {
              chai.expect(res.status).to.eql(200); // expression which will be true if response status equal to 201
              token = res.body.token;
              done();
            })
            .catch(done);
      });
  
      it("it should find a user created by the church", done => {
        chai
            .request(server)
            .post(`/api/v1/users/get`)
            .set("Authorization", `Bearer ${token}`)
            .then((res) => {
              chai.expect(res.status).to.eql(200); // expression which will be true if response status equal to 201
              chai.assert.isObject(res.body.user); // assertion expression which will be true if id exists
              done();
            })
            .catch(done);
      });
      
    });
