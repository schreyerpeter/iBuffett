var app = angular.module('stocks', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/',
  {
    templateUrl: 'pages/intro.view.html'
  })
  .when('/home',
    {
      templateUrl: 'pages/container.view.html',
      controller: 'stockController',
      controllerAs: 'stock'
    }
  )
    .when('/portfolio',{
      templateUrl: 'pages/portfolio.view.html',
      controller: 'portfolioController',
      controllerAs: 'portfolio'
    }
  )
}]);
