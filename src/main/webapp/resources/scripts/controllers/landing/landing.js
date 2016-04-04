'use strict';

angular.module('app').controller('LandingCtrl', ['$location', 'MediaService', 'profile', 'FavoritesService', function ($location, MediaService, profile, FavoritesService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {

        MediaService.getSoundCloudCredentials().$promise.then(function (response) {
            SC.initialize({
                client_id: response.id,
                secret_token: response.secret,
                redirect_uri: 'http://localhost:8080/test/#/'
            });
        });

        ctrl.getFavorites();

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

    ctrl.getFavorites = function(){
        FavoritesService.getFavorites({email: ctrl.currentUser.email}).$promise.then(function (response) {
            ctrl.favorites = [];
            ctrl.tracks = [];
            for(var i = 0; i < response.length; i++){
                SC.get('/users/' + response[i].artist_id).then(function(response){
                    ctrl.favorites.push(response);
                    //console.log(response);
                });
            }
        })
    };

    ctrl.goToMusic = function(){
        $location.path('/music');
    };

}]);