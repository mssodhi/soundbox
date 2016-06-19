'use strict';

angular.module('app').controller('SearchBarCtrl', function ($location, MusicService) {
    var ctrl = this;

    ctrl.search = function (query) {
        return SC.get('/search/', {q: query, limit: 10}).then(function (response) {
            return response.collection;
        });
    };

    ctrl.selectFromTypeahead = function (obj) {
        if(obj.kind === 'user'){
            $location.path('/music/'+ obj.permalink);
        }
        if(obj.kind === 'track'){
            ctrl.getSpecificTrack(obj);
        }
    };

    ctrl.getSpecificTrack = function (track) {
        $location.path('/music/'+ track.user.permalink);
        SC.stream('/tracks/' + track.id, {autoPlay: true}).then(function (player) {
            MusicService.setPlayer(player, track);
            MusicService.setList(ctrl.tracks);
        });
    };

});