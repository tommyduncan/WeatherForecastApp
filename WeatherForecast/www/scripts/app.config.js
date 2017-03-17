angular.module('WeatherForecast').config(['$stateProvider', '$ionicConfigProvider', function ($stateProvider, $ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');

    $stateProvider.state('menu', {
        url: '/menu',
        cache: false, 
        abstract: true,
        templateUrl: 'views/menu.html',
        controller: 'MenuController'
    })
    .state('menu.index', {
        url: '/',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }
        }
    })
    .state('menu.weather', {
        url: '/weather/:cityId',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/weather.html',
                controller: 'WeatherController'
            }
        }
    })
}]);