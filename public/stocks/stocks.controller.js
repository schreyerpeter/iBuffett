var app = angular.module('stocks');

app.controller('stockController', stocks);

function stocks($http, $interval){
  vm = this;

  var getData = function(){

    var data = $http.get('http://localhost:8080/data');
    data.then(function(datum){
      vm.name = datum.data.query.results.quote.Name;
      vm.symbol = datum.data.query.results.quote.symbol;
      vm.price = datum.data.query.results.quote.LastTradePriceOnly;
      vm.open = datum.data.query.results.quote.Open;
      vm.changePercent = datum.data.query.results.quote.PercentChange;
      vm.change = datum.data.query.results.quote.Change;
    })
  }
  $interval(getData, 5000);
}
