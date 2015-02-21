var chai = require('chai');
var expect = chai.expect;

var getMovieRating = require('../getMovieRating');

describe("get movie rating", function() {
  describe("proper json", function() {
    it("should return proper json", function() {
      var ratingJSON = getMovieRating('batman');
      expect(ratingJSON.imdbRating.to.equal("7.6"));
    });

    it("should return undefined if movie not found", function() {
      var ratingJSON = getMovieRating('undefiniednotamovie');
      expect(ratingJSON.imdbRating.to.equal("undefined"));
    });
  });

});
