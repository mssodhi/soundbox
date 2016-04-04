'use strict';

angular.module('app').factory('MusicService', ['MediaService', function (MediaService) {
    var player;
    var isPlaying;
    var track;
    var list;

    MediaService.getSoundCloudCredentials().$promise.then(function (response) {
        SC.initialize({
            client_id: response.id,
            secret_token: response.secret,
            redirect_uri: 'http://localhost:8080/test/#/'
        });
    });

    return {
        getPlayer: function () {
            return player;
        },
        setList: function(inpList) {
            list = inpList;
        },
        setPlayer: function(pl, tr) {
            // if a player exists, pause and set it as temp.
            if(player){
                player.pause();
                var temp = player;
            }

            player = pl;
            track = tr;

            // compare temp with newly set player. if diff, then play new music and set playing to true.
            if(player != temp){
                pl.play();
                isPlaying = true;
            }
        },
        getTrack: function() {
            return track;
        },
        play: function() {
            if(player){
                player.play();
                isPlaying = true;
            }
        },
        pause: function() {
            if(player){
                player.pause();
                isPlaying = false;
            }
        },
        getIsPlaying: function() {
            return isPlaying;
        },
        rewind: function(){
            player.seek(0);

        },
        seek: function(t){
            player.seek(t);
        },
        getNext: function() {
            var indexOfCurrent = list.indexOf(track);
            if(list[indexOfCurrent + 1]){
                return list[indexOfCurrent + 1];
            }else{
                return list[0];
            }
        }
    };
}]);