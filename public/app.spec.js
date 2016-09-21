var assert = require('chai').assert;
var request = require('request');

describe('Testing REST API with Hooks', function(){
  var Client = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/ibuffett";
  before(function(done){
    Client.connect(url, function(error, db){
      if(error){
        done();
        db.close();
      } else {
        var portfolio = db.collection('portfolio');
        portfolio.insertOne({
          symbol: "TEST",
          quantity: 100
        }, function(error, results){
          if (error){
            done();
            db.close();
          } else {
            done();
            db.close();
          }
        })
      }
    })
  })

  describe('SEARCHING', function(){
    this.timeout(3000);
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

  describe('RETRIEVING STOCK DATA', function(done){
    this.timeout(30000); //200 ms returned timeout error
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

  describe("RETRIEVING PORTFOLIO DATA", function(done){
    it('lets you view the stocks you own', function(done){
      request({
        url:"http://localhost:8080/portfolio",
        method: "GET"
      }, function(error, response){
        assert.equal(response.statusCode, 200);
        done();
      })
    })
    it('requires you to own stocks already', function(done){
      request({
        url:"http://localhost:8080/portfolio/empty",
        method: "GET"
      }, function(error, response){
        assert.equal(response.statusCode, 404);
        done();
      })
    })
  })

  describe("PURCHASING STOCKS", function(done){
    it('lets you add stocks to your portfolio', function(done){
      request({
        url:"http://localhost:8080/portfolio/:symbol/:quantity",
        method: "POST"
      }, function(error, response){
        assert.equal(response.statusCode, 200);
        done();
      })
    })
    it('requires a valid ticker and quantity', function(done){
      request({
        url:"http://localhost:8080/portfolio/invalidTickerOrQuantity",
        method: "POST"
      }, function(error, response){
        assert.equal(response.statusCode, 404);
        done();
      })
    })
  })

  describe("SELLING ALL STOCKS OF THIS TYPE", function(done){
    it('lets you sell all stocks of one type from your portfolio', function(done){
      request({
        url:"http://localhost:8080/portfolio/:symbol/:quantity",
        method: "DELETE"
      }, function(error, response){
        assert.equal(response.statusCode, 200);
        done();
      })
    })
    it('requires a valid ticker and quantity', function(done){
      request({
        url:"http://localhost:8080/portfolio/invalidTickerOrQuantity",
        method: "DELETE"
      }, function(error, response){
        assert.equal(response.statusCode, 404);
        done();
      })
    })
  })

  describe("SELLING SOME STOCKS OF THIS TYPE", function(done){
    it('lets you sell some of a certain type of stock from your portfolio', function(done){
      request({
        url:"http://localhost:8080/portfolio/:symbol/:quantity",
        method: "PUT"
      }, function(error, response){
        assert.equal(response.statusCode, 200);
        done();
      })
    })
    it('requires a valid ticker and quantity', function(done){
      request({
        url:"http://localhost:8080/portfolio/invalidTickerOrQuantity",
        method: "PUT"
      }, function(error, response){
        assert.equal(response.statusCode, 404);
        done();
      })
    })
  })


  after(function(done){
    Client.connect(url, function(error, db){
      if (error){
        done();
        db.close();
      } else {
        var portfolio = db.collection('portfolio');
        portfolio.remove(
          {quantity: { $lt:1 }},
          function(error, reponse){
            if (error){
              done();
              db.close();
            } else {
              done();
              db.close();
            }
          }
        );
      }
    })
  })
})
