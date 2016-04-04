'use strict';

angular.module('app').controller('LoginCtrl', ['UserService', '$location', 'LocalStorage', 'FacebookService', function (UserService, $location, LocalStorage, FacebookService) {
    var ctrl = this;

    ctrl.init = function () {
        ctrl.showLoginForm = true;
        ctrl.showRegisterForm = false;
        //FacebookService.getCredentials().$promise.then(function(response){
        //    FB.init({
        //        appId      : response.app_id,
        //        cookie     : true,  // enable cookies to allow the server to access
        //                            // the session
        //        xfbml      : true,  // parse social plugins on this page
        //        version    : 'v2.5' // use graph api version 2.5
        //    });
        //});
    };

    ctrl.register = function(){
        var user = {name: ctrl.name, email: ctrl.email};
        UserService.addUser(user).$promise.then(function(response){
            if(response){
                LocalStorage.setData(response.email);
                $location.path('/landing');
            }else{
                ctrl.idk()
            }
        });

    };

    ctrl.login = function(){
        ctrl.noUserFound = false;
        UserService.getByEmail({email: ctrl.email}).$promise.then(function(response){
            if(response.id != 'null'){
                LocalStorage.setData(response.email);
                $location.path('/landing');
            }else{
                ctrl.noUserFound = true;
            }
        });
    };

    ctrl.idk = function(){
        $location.path('/deny');
    };

}]);