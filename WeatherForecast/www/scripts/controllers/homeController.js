angular.module('WeatherForecast').controller('HomeController', ['$scope', '$ionicSideMenuDelegate', '$ionicPopup', '$state', 'WeatherService', 'GeocodingService', function ($scope, $ionicSideMenuDelegate, $ionicPopup, $state, WeatherService, GeocodingService) {
    var date = new Date();
    var today = date.getMonth() + 1 + '月' + date.getDate() + '日', tomorrow;
    var nowHour = date.getHours();
    var symbolURL = 'http://www.cwb.gov.tw/V7/symbol/weather/gif/day/';
    $scope.weatherSymbol = [];    

    /* 打開目錄欄 */
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }

    /* 定義今天、明天日期 */
    date.setDate(date.getDate() + 1);
    tomorrow = date.getMonth() + 1 + '月' + date.getDate() + '日';

    /* 定義天氣預報的標題 */
    if (nowHour >= 0 && nowHour < 6){
        $scope.forecastTitle1 = '今日白天';
        $scope.forecastTitle2 = '今日晚上';
    } else if (nowHour >= 6 && nowHour < 18) {
        $scope.forecastTitle1 = '今日晚上';
        $scope.forecastTitle2 = '明日白天';
    } else if (nowHour >= 18 && nowHour < 24) {
        $scope.forecastTitle1 = '明日白天';
        $scope.forecastTitle2 = '明日晚上';
    }

    navigator.geolocation.getCurrentPosition(function (position) {    // 利用 Cordova 的 geolacation plugin 取得當前經緯度
        GeocodingService.getCityName(position.coords.latitude, position.coords.longitude, function (data) {    // 利用經緯度取得當前所在之城市
            /* 例外格式轉換 */
            if (data.results[0].address_components[4].long_name === '台北市')
                currentCity = '臺北市';
            else
                currentCity = data.results[0].address_components[4].long_name;

            $scope.nowLocation = currentCity;    // 定義 $scope.nowLocation 為當前所在城市

            WeatherService.getWeatherForecastData(function (data) {    // 取得「今明36小時天氣預報」資料
                for (key in data.cwbopendata.dataset.location) {    // 找尋當前所在位置之天氣資料
                    if (data.cwbopendata.dataset.location[key].locationName === currentCity) {    // 找到後，便將資料放入 $scope.weatherData
                        $scope.weatherData = data.cwbopendata.dataset.location[key];

                        /* 定義各種天氣的 icon 編號 (編號小於10的，前面要加0) */
                        for (var i = 0; i < 3; i++) {
                            if (data.cwbopendata.dataset.location[key].weatherElement[0].time[i].parameter.parameterValue < 10)
                                $scope.weatherSymbol.push(symbolURL + '0' + data.cwbopendata.dataset.location[key].weatherElement[0].time[i].parameter.parameterValue + '.gif');
                            else
                                $scope.weatherSymbol.push(symbolURL + data.cwbopendata.dataset.location[key].weatherElement[0].time[i].parameter.parameterValue + '.gif');
                        }
                    }
                }
            });
        });
    }
    , function (error) {
        $ionicPopup.alert({
            title: 'GPS定位錯誤！',
            template: 'error code: ' + error.code + '<br >' + 'error message: ' + error.message,
            buttons: [{
                text: '關閉',
                type: 'button-calm',
            }]
        });
    }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
}]);