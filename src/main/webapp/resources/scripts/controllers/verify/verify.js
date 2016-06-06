'use strict';

angular.module('app').controller('VerifyCtrl', function ($routeParams, UserService, $location, $uibModal) {
    var ctrl = this;
    if($routeParams.code){
        UserService.verifyUser({secret: $routeParams.code}).$promise.then(function (response) {
            if(response.id && response.id !== null){
                ctrl.verifySuccess = true;
                ctrl.openModal();
            }else{
                ctrl.couldNotVerify = true;
            }
        })   
    }

    ctrl.openModal = function () {
        $uibModal.open({
            animation: true,
            templateUrl: 'resources/scripts/controllers/verify/circle-check.html',
            controller: 'CircleCheckModalCtrl',
            controllerAs: 'ctrl',
            size: 'sm'
        });
    };
});