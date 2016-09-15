var app = angular.module('stocks');

app.controller('portfolioController', portfolio);

portfolio.$inject = ['$http', '$interval', 'Stocks'];

function portfolio($http, $interval, Stocks){
  vm = this;

  var fetch = $http.get('http://localhost:8080/portfolio', name);
  fetch.then(function(datum){
    vm.portfolioData = datum.data;
    console.log(vm.portfolioData);
  })

  vm.buyingPower = 10000;

  vm.buy = function(quantity){
    console.log(quantity);
    console.log(vm.price);
    vm.buyingPower -= quantity * vm.price;
    console.log(vm.buyingPower);
  };

  vm.search = function(symbol){
    var data = {};
    data.symbol = symbol;
    if(symbol.length>0){

      var request = Stocks.get(data);
      request.then(function(datum){
        if (datum.data.query.results.quote.Name != null){
          vm.name = datum.data.query.results.quote.Name;
          vm.symbol = datum.data.query.results.quote.symbol;
          vm.price = datum.data.query.results.quote.LastTradePriceOnly;
          vm.open = datum.data.query.results.quote.Open;
          vm.changePercent = datum.data.query.results.quote.PercentChange;
          vm.change = datum.data.query.results.quote.Change;
          vm.previous = datum.data.query.results.quote.PreviousClose;
          vm.volume = datum.data.query.results.quote.Volume;
          vm.range = datum.data.query.results.quote.DaysRange;
          vm.ratio = datum.data.query.results.quote.PEGRatio;
        }
      })
    }
  }
}
