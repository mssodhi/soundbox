'use strict';

angular.module('app').factory('UserService', function ($resource) {
    return $resource('api/user/', {},  {

        checkEmailAvailability: {method: 'GET', url: 'api/user/checkAvailability/:email'},
        addUser: {method: 'PUT', url: 'api/user/addUser'},
        updateLocation: {method: 'POST', url: 'api/user/updateLocation'},
        updateSettings: {method: 'PUT', url: 'api/user/updateSettings'},
        addSettings: {method: 'POST', url: 'api/user/addSettings'},
        login: {method: 'PUT', url: 'api/user/login/:email'},
        logout: {method: 'GET', url: 'api/user/logout'},
        getCurrentUser: {method: 'GET', url: 'api/user/getCurrent'},
        verifyUser: {method: 'GET', url: 'api/user/verify/:secret'}

    });
});