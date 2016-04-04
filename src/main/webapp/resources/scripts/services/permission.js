'use strict';

angular.module('app').factory('PermissionService', function ($location, LocalStorage, UserService) {

    return {
        permissionCheck: function (login) {
            var tempEmail = LocalStorage.getData();
            if(tempEmail){
                UserService.getByEmail({email: tempEmail}).$promise.then(function(response){
                    if(response.id != 'null'){
                        if(login == 1){
                            $location.path('/landing');
                        }
                        // User email is valid, and user in fact is in the system.
                        return true;
                    }else{
                        $location.path('/');
                        LocalStorage.clear();
                    }
                });
            }else{
                LocalStorage.clear();
                $location.path('/');
            }
        }

    };
});