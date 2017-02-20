angular.module('WeatherForecast').service('GeocodingService', function ($http) {
    this.getCityName = function (lat, lng, onSuccess) {
        $http.get('http://maps.google.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&language=zh-TW&sensor=true').
        success(function (data, status, headers, config) {
            (onSuccess || angular.noop)(data);
        }).
        error(function (data, status, headers, config) {
            console.log("Error Data:" + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
        });
    };
});