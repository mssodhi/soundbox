'use strict';

angular.module('app').component("searchBar", {
    templateUrl: 'resources/scripts/components/search/search-bar.html',
    controllerAs: 'ctrl',
    controller: function ($location) {
        var ctrl = this;

        ctrl.search = function (query) {
            return SC.get('/search/', {q: query, limit: 10}).then(function (response) {
                return response.collection;
            });
        };

        ctrl.selectFromTypeahead = function (obj) {
            if(obj.kind === 'user'){
                $location.path('/artist/'+ obj.permalink);
            }
            if(obj.kind === 'track'){
                $location.path('/artist/'+ obj.user.permalink);
            }
        };
    }
});