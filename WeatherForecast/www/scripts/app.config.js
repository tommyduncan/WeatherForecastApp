angular.module('WeatherForecast').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('index', {
        cache: false,
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })
}]);