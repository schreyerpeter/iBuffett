var app = angular.module('stocks');

app.controller('portfolioController', portfolio);

portfolio.$inject = ['$http', '$interval', 'Stocks'];

function portfolio($http, $interval, Stocks){
  vm = this;
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
