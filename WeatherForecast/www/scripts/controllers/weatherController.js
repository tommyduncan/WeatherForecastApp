angular.module('WeatherForecast').controller('WeatherController', ['$scope', '$stateParams', '$ionicSideMenuDelegate', 'WeatherService', function ($scope, $stateParams, $ionicSideMenuDelegate, WeatherService) {
    var date = new Date();
    var nowHour = date.getHours();
    var symbolURL = 'http://www.cwb.gov.tw/V7/symbol/weather/gif/day/';
    $scope.weatherSymbol = [];

    /* 定義天氣預報的標題 */
    if (nowHour >= 0 && nowHour < 6) {
        $scope.forecastTitle1 = '今日白天';
        $scope.forecastTitle2 = '今日晚上';
    } else if (nowHour >= 6 && nowHour < 18) {
        $scope.forecastTitle1 = '今日晚上';
        $scope.forecastTitle2 = '明日白天';
    } else if (nowHour >= 18 && nowHour < 24) {
        $scope.forecastTitle1 = '明日白天';
        $scope.forecastTitle2 = '明日晚上';
    }

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }

    WeatherService.getWeatherForecastData(function (data) {
        $scope.weatherData = data.cwbopendata.dataset.location[$stateParams.cityId];
        
        for (var i = 0; i < 3; i++) {
            if (data.cwbopendata.dataset.location[$stateParams.cityId].weatherElement[0].time[i].parameter.parameterValue < 10)
                $scope.weatherSymbol.push(symbolURL + '0' + data.cwbopendata.dataset.location[$stateParams.cityId].weatherElement[0].time[i].parameter.parameterValue + '.gif');
            else
                $scope.weatherSymbol.push(symbolURL + data.cwbopendata.dataset.location[$stateParams.cityId].weatherElement[0].time[i].parameter.parameterValue + '.gif');
        }
    });
}]);