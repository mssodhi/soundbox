'use strict';

angular.module('app').factory('PageService', function($window) {
    return {
        setTitle: function(newTitle) { $window.document.title = newTitle }
    };
});