'use strict';

angular.module('app').factory('CredentialsService', function ($resource) {
    return $resource('api/credentials/', {}, {

        getSoundCloudCredentials: {method: 'GET', url: 'api/credentials/getSoundCloud'},
        getYouTubeCredentials: {method: 'GET', url: 'api/credentials/getYoutube'},
        getFacebookCredentials: {method: 'GET', url: 'api/credentials/getFacebook'}

    });
});