'use strict';

angular.module('app').factory('UserService', function ($resource) {
    return $resource('api/user/', {},  {
        updateLocation: {method: 'POST', url: 'api/user/updateLocation'},
        updateSettings: {method: 'PUT', url: 'api/user/updateSettings'},
        addSettings: {method: 'POST', url: 'api/user/addSettings'},
        getCurrentUser: {method: 'GET', url: 'api/user/getCurrent'}
    });
});