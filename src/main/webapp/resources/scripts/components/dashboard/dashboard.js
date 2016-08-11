'use strict';

angular.module('app').component("dashboard", {
    templateUrl: 'resources/scripts/components/dashboard/dashboard.html',
    controllerAs: 'ctrl',
    controller: function (FavoritesService, $location, UserService) {
        var ctrl = this;
        ctrl.init = function () {
            UserService.getCurrentUser().$promise.then(function (res) {
                ctrl.currentUser = res;
            })
        };
    },
    bindings: {
        favorites: '='
    }
});