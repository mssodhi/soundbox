'use strict';

angular.module('app').factory('UserService', function ($resource) {
    return $resource('api/user/', {},  {

        getByEmail: {method: 'GET', url: 'api/user/getByEmail/:email'},
        addUser: {method: 'PUT', url: 'api/user/addUser'},
        updateLocation: {method: 'POST', url: 'api/user/updateLocation/:email'},
        updateSettings: {method: 'PUT', url: 'api/user/updateSettings/:email'},
        addSettings: {method: 'POST', url: 'api/user/addSettings/:email'},
        login: {method: 'GET', url: 'api/user/login/:email'},
        logout: {method: 'GET', url: 'api/user/logout'},
        getCurrentUser: {method: 'GET', url: 'api/user/getCurrent'}

    });
});