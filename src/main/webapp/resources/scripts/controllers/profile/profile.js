'use strict';

angular.module('app').controller('ProfileCtrl', function (profile, UserService, SettingsService) {
    var ctrl = this;

    ctrl.currentUser = profile;
    SettingsService.getSettings().$promise.then(function (res) {
        console.log(res);
    });

    ctrl.resetPassword = function () {
        ctrl.incorrectPassword = false;
        if(ctrl.currentUser.password === MD5(ctrl.currentPass)){
            if(ctrl.reset1 === ctrl.reset2){
                ctrl.currentUser.password = MD5(ctrl.reset1);
                UserService.updatePassword(ctrl.currentUser).$promise.then(function (res) {
                    ctrl.currentUser = res;
                    ctrl.success = true;
                })
            }
        }else{
            ctrl.incorrectPassword = true;
        }
    };
});