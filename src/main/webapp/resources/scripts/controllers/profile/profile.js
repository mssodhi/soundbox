'use strict';

angular.module('app').controller('ProfileCtrl', function (profile, UserService) {
    var ctrl = this;

    ctrl.currentUser = profile;

    ctrl.init = function () {
        ctrl.switchCards('profile');
        ctrl.adjustProgress();
    };

    ctrl.updateSettings = function () {
        var settings;

        if(ctrl.currentUser.settings.id){
            settings = {id: ctrl.currentUser.settings.id, notifications: ctrl.currentUser.settings.notifications};

            UserService.updateSettings({email: ctrl.currentUser.email}, settings).$promise.then(function(response){
                ctrl.currentUser = response;
            });

        }else{
            settings = {notifications: ctrl.currentUser.settings.notifications};

            UserService.addSettings({email: ctrl.currentUser.email}, settings).$promise.then(function(response){
                ctrl.currentUser = response;
            });
        }

    };

    ctrl.saveLocation = function () {
        UserService.updateLocation({email: ctrl.currentUser.email}, ctrl.currentUser.location).$promise.then(function(response){
            ctrl.currentUser = response;
            ctrl.adjustProgress();
        })
    };

    ctrl.adjustProgress = function() {

        if(ctrl.currentUser.location){
            ctrl.myStyle = {'width':'100%'};
            ctrl.progress = '100%';
            ctrl.myClass = 'progress-bar-complete';
        }else{
            ctrl.myStyle = {'width':'60%'};
            ctrl.progress = '60%';
            ctrl.myClass = 'progress-bar-incomplete';
        }
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