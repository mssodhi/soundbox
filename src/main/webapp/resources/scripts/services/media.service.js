'use strict';

angular.module('app').factory('MediaService', function ($resource) {
    return $resource('api/music/', {}, {

        getSoundCloudCredentials: {method: 'GET', url: 'api/media/getSoundCloudCredentials'},
        getYouTubeCredentials: {method: 'GET', url: 'api/media/getYoutubeCredentials'}

    });
});