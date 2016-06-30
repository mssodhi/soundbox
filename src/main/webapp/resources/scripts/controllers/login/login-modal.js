// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
'use strict';

angular.module('app').controller('LoginModalCtrl', function ($uibModalInstance, LoginService, $location) {

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
        ctrl.password = MD5(ctrl.password);
        LoginService.login({email: ctrl.email}, ctrl.password).$promise.then(function (response) {
            if(response.id){
                ctrl.goToLanding();
            }else{
                ctrl.noUserFound = true;
            }
        });
    };
    
    ctrl.register = function(){
        ctrl.emailNotValid = false;
        if(validateEmail(ctrl.email)){
            ctrl.passwordNotSame = false;
            ctrl.emailTaken = false;
            ctrl.verificationEmailSent = false;
            if(ctrl.password === ctrl.repeatedPassword){
                ctrl.password = MD5(ctrl.password);
                ctrl.repeatedPassword = MD5(ctrl.password);
                var user = {name: ctrl.name, email: ctrl.email, password: ctrl.password};
                LoginService.checkEmailAvailability({email: ctrl.email}).$promise.then(function (response) {
                    if(response.taken !== 'true'){
                        LoginService.addUser(user).$promise.then(function(response){
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
        }else{
            ctrl.emailNotValid = true;
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

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});