var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');
var unirest = require('unirest');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ibuffett';

app.use(bodyParser());
app.use(express.static('public'));

app.get('/data', function(req,res){
  request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22GOOG%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
    else {
      res.sendStatus(400);
    }
  })
})

app.post('/search/news', function(req, res){
  var response = [];
  unirest.get("https://webhose.io/search?token=62bf1eff-e651-4e43-a89a-ac500352d069&format=json&q="+req.body.name+"%20language%3A(english)")
  .header("Accept", "text/plain")
  .end(function (result) {
    var body = result.body.posts;
    body.forEach(function(item){
      var stockNews = {};
      stockNews.url = item.thread.url;
      stockNews.title = item.thread.title;
      response.push(stockNews);
    })
      res.send(response);
  });

})

app.post('/search', function(req,res){
  request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + req.body.symbol +'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
    else {
      res.sendStatus(400);
    }
  })
})

app.get('/portfolio', function(req,res){
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log(err);
      db.close();
      res.sendStatus(500);
    } else {
      var portfolio = db.collection('portfolio');
      portfolio
      .find({})
      .toArray(function(error, documents){
        db.close();
        res.send(documents);
      })
    }
  })
});


app.post('/portfolio/:symbol', function(req,res){
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log(err);
    }
    else {
      var portfolio = db.collection('portfolio');
      portfolio
      .insertOne({
        symbol: req.params.symbol,
        quantity: req.params.quantity
      }, function(error, results){
        if (error){
          db.close();
          res.send("Something went wrong");
        } else {
          db.close();
          res.send("Successful post");
        }
      }
    )
  }
})
})

app.delete('/portfolio/:symbol', function(req,res){
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log(error);
    } else{
      var portfolio = db.collection('portfolio');
      portfolio
      .deleteOne(
        {symbol: req.params.symbol},
        function(error, response){
          if (error){
            res.sendStatus(500);
            db.close();
          } else {
            res.sendStatus(200);
            db.close();
          }
        })
      }
    })
  })

  app.put("/portfolio/:symbol/:quantity", function(req, res){
    MongoClient.connect(url, function(err, db){
      if (err){
        console.log(error);
        db.close();
      } else {
        var portfolio = db.collection('portfolio');
        portfolio
        .updateOne(
          {symbol: req.params.symbol},
          {$set: {quantity: req.params.quantity}},
          function(error, result){
            if (error){
              res.sendStatus(500);
              db.close();
            } else{
              res.sendStatus(200);
              db.close();
            }
          }
        )
      }
    })
  });
  var PORT = process.env.PORT || 8080;
  app.listen(PORT);
