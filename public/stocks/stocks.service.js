var app = angular.module('stocks');

app.factory('Stocks', ['$http', function($http){
  return{
    get: function(data){
      return $http.post('http://localhost:8080/search', data);
    }
  }
}]);
