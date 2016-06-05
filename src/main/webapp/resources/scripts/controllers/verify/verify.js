'use strict';

angular.module('app').controller('VerifyCtrl', function ($routeParams, UserService, $location) {
    var ctrl = this;
    if($routeParams.code){
        UserService.verifyUser({secret: $routeParams.code}).$promise.then(function (response) {
            if(response.id && response.id !== null){
                $location.path('/');
            }else{
                ctrl.couldNotVerify = true;
            }
        })   
    }
});