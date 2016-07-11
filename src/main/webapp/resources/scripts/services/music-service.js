'use strict';

angular.module('app').factory('MusicService', function () {
    var player;
    var isPlaying;
    var track;
    var list;

    return {
        getPlayer: function () {
            return player;
        },
        setList: function(inpList) {
            list = inpList;
        },
        setPlayer: function(pl, tr) {
            if(player){
                player = undefined;
            }
            player = pl;
            track = tr;
            player.seek(0);
            isPlaying = true;
            player.play();
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
        },
        getPrevious: function() {
            var indexOfCurrent = list.indexOf(track);
            if(list[indexOfCurrent - 1]){
                return list[indexOfCurrent - 1];
            }else{
                return list[list.length - 1];
            }
        }
    };
});