'use strict';

angular.module('app').controller('ProfileCtrl', function (profile, UserService) {
    var ctrl = this;

    ctrl.currentUser = profile;

    ctrl.init = function () {
        ctrl.switchCards('profile');
    };

    ctrl.updateSettings = function () {
        var settings;

        if(ctrl.currentUser.settings.id){
            settings = {id: ctrl.currentUser.settings.id, notifications: ctrl.currentUser.settings.notifications};

            UserService.updateSettings({}, settings).$promise.then(function(response){
                ctrl.currentUser = response;
            });

        }else{
            settings = {notifications: ctrl.currentUser.settings.notifications};

            UserService.addSettings({}, settings).$promise.then(function(response){
                ctrl.currentUser = response;
            });
        }

    };

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

    ctrl.saveLocation = function () {
        UserService.updateLocation({}, ctrl.currentUser.location).$promise.then(function(response){
            ctrl.currentUser = response;
            ctrl.adjustProgress();
        })
    };
    
    ctrl.switchCards = function(card){
        if(card == 'profile'){
            ctrl.showProfile = true;
            ctrl.showAccount = false;
        } else{
            // else account
            ctrl.showAccount = true;
            ctrl.showProfile = false;
        }
    };
});