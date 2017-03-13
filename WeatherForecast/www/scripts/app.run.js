angular.module('WeatherForecast').run(['$state', '$ionicPlatform', function ($state, $ionicPlatform) {
    $ionicPlatform.ready(function () {
        $state.go('menu.index');
    });
}]);