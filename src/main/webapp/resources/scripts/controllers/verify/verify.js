'use strict';

angular.module('app').controller('VerifyCtrl', function ($routeParams, UserService, $location, $uibModal) {
    var ctrl = this;
    if($routeParams.code){
        UserService.verifyUser({secret: $routeParams.code}).$promise.then(function (response) {
            if(response.id && response.id !== null){
                ctrl.verifySuccess = true;
                ctrl.openSuccess();
            }else{
                ctrl.openError();
                ctrl.couldNotVerify = true;
            }
        })   
    }

    ctrl.openSuccess = function () {
        $uibModal.open({
            animation: true,
            templateUrl: 'resources/scripts/controllers/verify/circle-check.html',
            controller: 'CommonModalCtrl',
            controllerAs: 'ctrl',
            size: 'sm'
        });
    };
    
    ctrl.openError = function () {
        $uibModal.open({
            animation: true,
            templateUrl: 'resources/scripts/controllers/verify/circle-error.html',
            controller: 'CommonModalCtrl',
            controllerAs: 'ctrl',
            size: 'lg',
            backdrop: 'static',
            keyboard: false
        });
    };
});