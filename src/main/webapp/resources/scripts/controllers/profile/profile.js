'use strict';

angular.module('app').controller('ProfileCtrl', function (profile, UserService, SettingsService) {
    var ctrl = this;

    ctrl.currentUser = profile;
    SettingsService.getSettings().$promise.then(function (response) {
        ctrl.settings = response;
    });

    ctrl.resetPassword = function () {
        ctrl.incorrectPassword = false;
        if(ctrl.reset1 === ctrl.reset2){
            ctrl.currentUser.password = MD5(ctrl.reset1);
            UserService.updatePassword({prev: MD5(ctrl.currentPass)}, ctrl.currentUser).$promise.then(function (res) {
                if(res.id){
                    ctrl.currentUser = res;
                    ctrl.success = true;
                }else{
                    ctrl.incorrectPassword = true;
                }
            })
        }
    };
});