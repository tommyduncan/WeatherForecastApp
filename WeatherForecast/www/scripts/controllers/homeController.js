angular.module('WeatherForecast').controller('HomeController', ['$scope', '$ionicLoading', 'WeatherService', 'GeocodingService', function ($scope, $ionicLoading, WeatherService, GeocodingService) {
    
    $ionicLoading.show({
      template: "<ion-spinner icon='ios'></ion-spinner>",
      duration: 2000
    }).then(function(){
       
    });

    navigator.geolocation.getCurrentPosition(function (position) {
        GeocodingService.getCityName(position.coords.latitude, position.coords.longitude, function (data) {
            if(data.results[0].address_components[4].long_name === '台北市')
                currentCity = '臺北市';
            else
                currentCity = data.results[0].address_components[4].long_name;

            $scope.nowLocation = currentCity;

            WeatherService.getWeatherForecastData(function (data) {
                for(key in data.cwbopendata.dataset.location){
                    if(data.cwbopendata.dataset.location[key].locationName === currentCity){
                        $scope.weatherData = data.cwbopendata.dataset.location[key];
                        console.log(data.cwbopendata.dataset.location[key].weatherElement);
                    }
                }
            });
        });
    }
    , function (error) {
        console.log(error);
    });
}]);