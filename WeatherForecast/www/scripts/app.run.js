angular.module('WeatherForecast').run(['$state', '$ionicPlatform', '$ionicLoading', function ($state, $ionicPlatform, $ionicLoading) {
    $ionicPlatform.ready(function () {
        /* 讀取動畫 */
        $ionicLoading.show({
            template: "<ion-spinner icon='ios'></ion-spinner>",
            duration: 1500
        });

        $state.go('menu.index');
    });
}]);