var app = angular.module('stocks');

app.controller('stockController', stocks);

function stocks($http, $interval){
  vm = this;

  vm.search = function(symbol){
    var data = {};
    data.symbol = symbol;
    var request = $http.post('http://localhost:8080/search', data);
    request.then(function(datum){
      if (datum.data.query.results.quote.Name != null){
        vm.name = datum.data.query.results.quote.Name;
        vm.symbol = datum.data.query.results.quote.symbol;
        vm.price = datum.data.query.results.quote.LastTradePriceOnly;
        vm.open = datum.data.query.results.quote.Open;
        vm.changePercent = datum.data.query.results.quote.PercentChange;
        vm.change = datum.data.query.results.quote.Change;
        vm.previous = datum.data.query.results.quote.PreviousClose;
      }
      else {
        vm.name = "Invalid ticker symbol";
        vm.symbol = '';
        vm.price = '';
        vm.open = '';
        vm.changePercent = '';
        vm.change = '';
      }
    })
  }

  // var getData = function(){
  //
  //   var data = $http.get('http://localhost:8080/data');
  //   data.then(function(datum){
  //     vm.name = datum.data.query.results.quote.Name;
  //     vm.symbol = datum.data.query.results.quote.symbol;
  //     vm.price = datum.data.query.results.quote.LastTradePriceOnly;
  //     vm.open = datum.data.query.results.quote.Open;
  //     vm.changePercent = datum.data.query.results.quote.PercentChange;
  //     vm.change = datum.data.query.results.quote.Change;
  //   })
  // }
  // $interval(getData, 5000);
}
