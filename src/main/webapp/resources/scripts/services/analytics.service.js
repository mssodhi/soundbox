'use strict';

angular.module('app').factory('AnalyticsService', function ($resource) {
    return $resource('api/analytics/', {}, {
        getAnalytics: {method: 'GET', url: 'api/analytics/user/:id'}
    });
});