var assert = require('chai').assert;
var request = require('request');

describe('Testing REST API', function(){
  var Client = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/example";

  describe('SEARCHING', function(){
    this.timeout(10000);
    it('lets you search for a stock', function(done){
      request({
        url: "http://localhost:8080/search",
        method: "POST"
      }, function(error, response){
        assert.equal(response.statusCode, 200);
        done();
      })
    })
    it('requires a ticker', function(done){
      request({
        url: "http://localhost:8080/search/data/without/ticker/",
        method: "POST"
      }, function(error, response){
        assert.equal(response.statusCode, 404);
        done();
      })
    })
  })

  describe('RETRIEVING', function(done){
    this.timeout(10000); //200 ms returned timeout error
    it('lets you search for news related to a stock', function(done){
      request({
        url: "http://localhost:8080/search/news",
        method: "POST"
      }, function(error, response){
        assert.equal(response.statusCode, 200);
        done();
      })
    })
    it('requires a ticker', function(done){
      request({
        url: "http://localhost:8080/search/without/ticker",
        method: "POST"
      }, function(error, response){
        assert.equal(response.statusCode, 404);
        done();
      })
    })
  })
  // after(function(done){
  //   var Client = require('mongodb').MongoClient;
  //   var url = 'mongodb://localhost:27017/ibuffett';
  //
  //   Client.connect(url, function(error, db){
  //     if (error){
  //       done();
  //       db.close();
  //     } else {
  //       var books = db.collection('portfolio');
  //       books.remove(
  //         {name: "add"},
  //         function(error, reponse){
  //           if (error){
  //             done();
  //             db.close();
  //           } else {
  //             done();
  //             db.close();
  //           }
  //         }
  //       );
  //     }
  //   })
  // })
})
