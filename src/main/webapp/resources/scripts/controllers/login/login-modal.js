// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
'use strict';

angular.module('app').controller('LoginModalCtrl', function ($uibModalInstance, UserService, $location) {

    var ctrl = this;
    
    ctrl.init = function () {
        ctrl.showLoginForm = true;
        ctrl.showRegisterForm = false;
    };

    ctrl.switchForm = function (form) {
        if(form === 'login'){
            ctrl.init();
        }else{
            ctrl.showRegisterForm = true;
            ctrl.showLoginForm = false;
        }
    };
    
    ctrl.login = function(){
        ctrl.noUserFound = false;
        UserService.login({email: ctrl.email}, ctrl.password).$promise.then(function (response) {
            if(response.id){
                ctrl.goToLanding();
            }else{
                ctrl.noUserFound = true;
            }
        });
    };
    
    ctrl.register = function(){
        ctrl.passwordNotSame = false;
        ctrl.emailTaken = false;
        ctrl.verificationEmailSent = false;
        if(ctrl.password === ctrl.repeatedPassword){
            var user = {name: ctrl.name, email: ctrl.email, password: ctrl.password};
            UserService.checkEmailAvailability({email: ctrl.email}).$promise.then(function (response) {
                if(response.taken !== 'true'){
                    UserService.addUser(user).$promise.then(function(response){
                        if(response){
                            ctrl.verificationEmailSent = true;
                        }else{
                            $location.path('/deny');
                        }
                    });
                }else{
                    ctrl.emailTaken = true;
                }
            });
        }else{
            ctrl.passwordNotSame = true;
        }
    };
    
    ctrl.isValid = function () {
        if(ctrl.password && ctrl.repeatedPassword){
            return ctrl.name && ctrl.email && ctrl.password.length > 0 && ctrl.repeatedPassword.length > 0;
        }else{
            return false;
        }
    } ;
    
    ctrl.goToLanding = function () {
        $uibModalInstance.close();
        ctrl.loggedIn = true;
    };
});