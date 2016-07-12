'use strict';

angular.module('app').factory('UserService', function ($resource) {
    return $resource('api/user/', {},  {
        addSettings: {method: 'POST', url: 'api/user/addSettings'},
        updateSettings: {method: 'PUT', url: 'api/user/updateSettings'},
        getCurrentUser: {method: 'GET', url: 'api/user/getCurrent'},
        updatePassword: {method: 'POST', url: 'api/user/updatePassword'}
    });
});