var assert = require('chai').assert;
var request = require('request');

describe('Testing REST API', function(){
  var Client = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/example";

  describe('CREATING', function(){
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
        url: "http://localhost:8080/",
        method: "POST"
      }, function(error, response){
        assert.equal(response.statusCode, 404);
        done();
      })
    })
  })
  // after(function(done){
  //   var Client = require('mongodb').MongoClient;
  //   var url = 'mongodb://localhost:27017/example';
  //
  //   Client.connect(url, function(error, db){
  //     if (error){
  //       done();
  //       db.close();
  //     } else {
  //       var books = db.collection('books');
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
