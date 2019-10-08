var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect; //One of the flavors of chai assertion

// Setting up the chai http plugin
chai.use(chaiHttp); //use function allows us to apply middlewares into our program

var request;

describe("GET /api/examples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true }); //blowing away database, starting our server up and recreating tables for us.
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { name: "Sam", age: 25, height: 68, weight: 165, sex: "male" },
      { name: "Billy", age: 35, height: 78, weight: 265, sex: "male" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/examples").end(function(err, res) {
        // if (err) {
        //   expect(true).to.be.equal(false);
        // }
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            name: "Sam",
            age: 25,
            height: 68,
            weight: 165,
            sex: "male"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            name: "Billy",
            age: 35,
            height: 78,
            weight: 265,
            sex: "male"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
