'use strict';

angular.module('app').factory('UserService', function ($resource) {
    return $resource('api/user/', {},  {
        getCurrentUser: {method: 'GET', url: 'api/user/getCurrent'},
        updatePassword: {method: 'POST', url: 'api/user/updatePassword/:prev'}
    });
});