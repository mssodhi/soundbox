'use strict';

angular.module('app').controller('LoginCtrl', ['UserService', '$location', 'LocalStorage', function (UserService, $location, LocalStorage) {
    var ctrl = this;

    ctrl.init = function () {
        ctrl.showLoginForm = true;
        ctrl.showRegisterForm = false;
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