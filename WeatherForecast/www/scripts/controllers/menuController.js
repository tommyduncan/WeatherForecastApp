angular.module('WeatherForecast').controller('MenuController', ['$scope', 'WeatherService', 'GeocodingService', function ($scope, WeatherService, GeocodingService) {
    $scope.nowLocation;
    $scope.location = [];

    navigator.geolocation.getCurrentPosition(function (position) {
        GeocodingService.getCityName(position.coords.latitude, position.coords.longitude, function (data) {
            if (data.results[0].address_components[4].long_name === '台北市') {
                $scope.nowLocation = '臺北市';
                $scope.location.push({ cityName: '臺北市', cityId: null });
            } else {
                $scope.nowLocation = data.results[0].address_components[4].long_name;
                $scope.location.push({ cityName: data.results[0].address_components[4].long_name, cityId: null });
            }

            WeatherService.getWeatherForecastData(function (data) {
                for (index in data.cwbopendata.dataset.location) {
                    if (data.cwbopendata.dataset.location[index].locationName === $scope.nowLocation) {
                    } else
                        $scope.location.push({ cityName: data.cwbopendata.dataset.location[index].locationName , cityId: index});
                }
            });
        });
    }, function (error) {
        console.log(error);
        console.log('code: ' + error.code);
        console.log('message: ' + error.message);
    }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
}]);