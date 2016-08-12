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
            switch (obj.objectType){
                case 'USER':
                    $location.path('/artist/'+ obj.user.username);
                    break;
                case 'SONG':
                    $location.path('/artist/'+ obj.song.user.username);
                    break;
                case 'PLAYLIST':
                    $location.path('/playlist/'+ obj.playlist.id);
                    break;
                default:
                    break;
            }
        };
    }
});