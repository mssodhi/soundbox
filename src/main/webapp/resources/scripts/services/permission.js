'use strict';

angular.module('app').factory('PermissionService', function ($location, UserService) {

    return {
        permissionCheck: function () {
            UserService.getCurrentUser().$promise.then(function (response) {
                if(response.id && response.username){
                    return true;
                }else{
                    $location.path('/login');
                }
            })
        }

    };
});