'use strict';

angular.module('app').component("searchBar", {
    templateUrl: 'resources/scripts/components/search/search-bar.html',
    controllerAs: 'ctrl',
    controller: function ($location, SearchService) {
        var ctrl = this;

        ctrl.search = function (query) {
            return SearchService.search({q: query}).$promise.then(function (response) {
                console.log(response);
                return response;
            })
        };

        ctrl.selectFromTypeahead = function (obj) {
            if(obj.objectType === 'USER'){
                $location.path('/artist/'+ obj.user.username);
            }
            if(obj.objectType === 'SONG'){
                $location.path('/artist/'+ obj.song.user.username);
            }
        };
    }
});