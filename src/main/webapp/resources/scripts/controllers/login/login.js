'use strict';

angular.module('app').controller('LoginCtrl', ['UserService', '$location', 'profile', function (UserService, $location, profile) {
    var ctrl = this;

    
    ctrl.init = function () {
        if(profile.id != null){
            ctrl.goToLanding();
        }

        ctrl.showLoginForm = true;
        ctrl.showRegisterForm = false;
        ctrl.emailTaken = false;
    };

    ctrl.showLogin = function () {
        ctrl.showForms = true;
    };

    ctrl.register = function(){
        ctrl.passwordNotSame = false;
        if(ctrl.password === ctrl.repeatedPassword){
            var user = {name: ctrl.name, email: ctrl.email, password: ctrl.password};
            UserService.checkEmailAvailability({email: ctrl.email}).$promise.then(function (response) {
                if(response.taken !== 'true'){
                    UserService.addUser(user).$promise.then(function(response){
                        if(response){
                            $location.path('/');
                        }else{
                            ctrl.idk()
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

    ctrl.goToLanding = function () {
        $location.path('/');
    };

    ctrl.idk = function(){
        $location.path('/deny');
    };

}]);