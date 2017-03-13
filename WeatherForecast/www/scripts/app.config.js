angular.module('WeatherForecast').config(['$stateProvider', '$ionicConfigProvider', function ($stateProvider, $ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');

    $stateProvider.state('menu', {
        url: '/menu', 
        abstract: true,
        templateUrl: 'views/menu.html',
        controller: 'MenuController'
    })
    .state('menu.index', {
        url: '/',
        views: {
            'menuContent': {
                templateUrl: 'views/home.html', 
                controller: 'HomeController'
            }
        }
    })
}]);