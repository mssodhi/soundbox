'use strict';

angular.module('app').controller('VerifyCtrl', function ($routeParams, LoginService) {
    var ctrl = this;
    
    ctrl.successMessage = 'Success!';
    ctrl.errorMessage = 'Sorry, the link has either expired or is no longer valid. We are unable to verify your account.';
    
    if($routeParams.code){
        LoginService.verifyUser({secret: $routeParams.code}).$promise.then(function (response) {
            if(response.id && response.id !== null){
                ctrl.verifySuccess = true;
            }else{
                ctrl.couldNotVerify = true;
            }
        })   
    }
});