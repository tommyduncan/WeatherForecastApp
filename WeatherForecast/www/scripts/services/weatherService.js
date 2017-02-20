angular.module('WeatherForecast').service('WeatherService', function ($http) {
    dataHost = 'http://104.199.219.156:3000/F-C0032-001.xml';

    this.getWeatherForecastData = function (onSuccess) {
        $http.get(dataHost).
        success(function (data, status, headers, config) {
            var x2js = new X2JS();
            var xmlText = data;
            (onSuccess || angular.noop)(x2js.xml_str2json(xmlText));
        }).
        error(function (data, status, headers, config) {
            console.log("Error Data:" + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
        });
    }
});