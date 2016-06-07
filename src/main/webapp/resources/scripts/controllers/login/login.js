'use strict';

angular.module('app').controller('LoginCtrl', function ($location, profile, $uibModal) {
    var ctrl = this;
    
    ctrl.init = function () {
        if(profile.id != null){
            $location.path('/');
        }
    };

    ctrl.openModal = function () {
        $uibModal.open({
            animation: true,
            templateUrl: 'resources/scripts/controllers/login/login-modal.html',
            controller: 'LoginModalCtrl',
            controllerAs: 'ctrl'
        });
    };
});