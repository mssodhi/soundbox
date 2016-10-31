'use strict';

angular.module('app').factory('CredentialsService', function ($resource) {
    return $resource('api/credentials/', {}, {

        getSoundCloudCredentials: {method: 'GET', url: 'api/credentials/getSoundCloud'},
        getFacebookCredentials: {method: 'GET', url: 'api/credentials/getFacebook'}

    });
});