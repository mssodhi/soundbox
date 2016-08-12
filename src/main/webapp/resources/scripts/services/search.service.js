'use strict';

angular.module('app').factory('SearchService', function ($resource) {
    return $resource('api/search/', {},  {
        search: {method: 'GET', url: 'api/search/query/:q', isArray: true}
    });
});