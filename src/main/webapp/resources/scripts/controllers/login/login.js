'use strict';

angular.module('app').controller('LoginCtrl', ['UserService', '$location', 'profile', function (UserService, $location, profile) {
    var ctrl = this;

    
    ctrl.init = function () {
        // console.log(profile);
        if(profile.id != null){
            ctrl.goToLanding();
        }

        ctrl.showLoginForm = true;
        ctrl.showRegisterForm = false;
    };

    ctrl.showLogin = function () {
        ctrl.showForms = true;
    };

    ctrl.register = function(){
        var user = {name: ctrl.name, email: ctrl.email};
        UserService.addUser(user).$promise.then(function(response){
            if(response){
                console.log(response);
                // LocalStorage.setData(response.email);
                $location.path('/landing');
            }else{
                ctrl.idk()
            }
        });

    };

    ctrl.login = function(){
        ctrl.noUserFound = false;
        UserService.login({email: ctrl.email}).$promise.then(function (res) {
            if(res.id != null){
                ctrl.goToLanding();
            }
            else{
                ctrl.noUserFound = true;
            }
        })
    };

    ctrl.goToLanding = function () {
        $location.path('/landing');
    };

    ctrl.idk = function(){
        $location.path('/deny');
    };

}]);