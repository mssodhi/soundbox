'use strict';

angular.module('app').controller('LandingCtrl', ['$scope', '$modal', '$http', 'UserService', 'profile', function ($scope, $modal, $http, UserService, profile) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {

        //if(ctrl.currentUser.location){
        //    $http({method: 'GET',
        //        url: 'http://api.openweathermap.org/data/2.5/weather?q='+ ctrl.currentUser.location +',us&appid=44db6a862fba0b067b1930da0d769e98'
        //    }).then(function successCallback(response) {
        //        ctrl.weather = response.data;
        //        ctrl.temp = (response.data.main.temp - 273.15) * 1.8000 + 32.00 + '';
        //        ctrl.temp = ctrl.temp.substring(0, 5);
        //    });
        //}
    };

}]);