angular.module('WeatherForecast').controller('HomeController', ['$scope', 'WeatherService', function ($scope, WeatherService) {
    WeatherService.getWeatherForecastData(function (data) {
        console.log(data);
        $scope.weatherForecastData = data.cwbopendata.dataset.location;
    });
}]);