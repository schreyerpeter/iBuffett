var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var d3 = require('d3');
var bodyParser = require('body-parser');

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


app.listen(8080);
