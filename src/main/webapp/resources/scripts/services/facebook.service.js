'use strict';

angular.module('app').factory('FacebookService', function ($resource) {
    return $resource('api/facebook/', {}, {

        getCredentials: {method: 'GET', url: 'api/facebook/getCredentials'}

    });
});