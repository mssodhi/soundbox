'use strict';

angular.module('app').controller('SettingsCtrl', function (profile, UserService, SettingsService) {
    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.init = function () {
        SettingsService.getSettings().$promise.then(function (response) {
            ctrl.settings = response;
        });
    };
});