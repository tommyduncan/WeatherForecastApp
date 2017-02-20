angular.module('WeatherForecast').controller('HomeController', ['$scope', 'WeatherService', 'GeocodingService', function ($scope, WeatherService, GeocodingService) {
    WeatherService.getWeatherForecastData(function (data) {
        console.log(data);
        $scope.weatherForecastData = data.cwbopendata.dataset.location;
    });

    navigator.geolocation.getCurrentPosition(function (position) {
        GeocodingService.getCityName(position.coords.latitude, position.coords.longitude, function (data) {
            $scope.nowLocation = data.results[0].address_components[3].long_name;
        });
    }
    , function (error) {
    });    
}]);