'use strict';

angular.module('app').controller('Hot-n-New-Ctrl', ['$location', 'profile', 'FavoritesService', function ($location, profile, FavoritesService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {

    };

    

}]);