'use strict';

angular.module('app').component("searchBar", {
    templateUrl: 'resources/scripts/components/search/search-bar.html',
    controller: 'SearchBarCtrl',
    controllerAs: 'ctrl'
});

angular.module('app').controller('SearchBarCtrl', function ($location, MusicService) {
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
            getSpecificTrack(obj);
        }
    };

    function getSpecificTrack (track) {
        $location.path('/artist/'+ track.user.permalink);
        SC.stream('/tracks/' + track.id, {autoPlay: true}).then(function (player) {
            MusicService.setPlayer(player, track);
            MusicService.setList(ctrl.tracks);
        });
    }

});