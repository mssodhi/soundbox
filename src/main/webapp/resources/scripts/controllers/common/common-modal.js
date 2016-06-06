// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
'use strict';

angular.module('app').controller('CommonModalCtrl', function ($location, $uibModalInstance, message) {
    var ctrl = this;
    ctrl.message = message;
    
    ctrl.initCheckCircle = function () {
        setTimeout(function () {
            ctrl.close();
            $location.path('/');
        }, 2000);
    };

    ctrl.goToLogin = function () {
        ctrl.close();
        $location.path('/login');
    };

    ctrl.close = function () {
        $uibModalInstance.close();
    };
});