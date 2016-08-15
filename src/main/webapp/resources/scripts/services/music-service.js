'use strict';

angular.module('app').factory('MusicService', function (SongService, UserService) {
    var player;
    var isPlaying;
    var track;
    var list = [];

    return {
        getPlayer: function () {
            return player;
        },
        setList: function(inpList) {
            for(var i = 0; i < inpList.length; i++){
                list[i] = inpList[i];
            }
        },
        getQueue: function () {
            var index = list.indexOf(track);
            var retList = [];
            for(var i = index-1; i < index+2; i++){
                retList.push(list[i]);
            }
            return retList;
        },
        stream: function (song) {
            if(isPlaying){
                if(player){
                    player.pause();
                }
                isPlaying = false;
            }
            if(song !== null && song.id !== null){
                UserService.getCurrentUser().$promise.then(function (res) {
                    if(res.fb_id !== song.user.fb_id){
                        SongService.updatePlaysCount({id: song.id}, res.fb_id);
                    }
                });

                player = document.createElement("AUDIO");
                player.src = song.song_url;
                player.title = song.title;
                player.name = song.user.name;
                track = song;

                player.play();
                isPlaying = true;

                if(player.currentTime > 0){
                    player.currentTime = 0;
                }

                player.addEventListener("timeupdate", function () {
                    if(player.currentTime === player.duration){
                        player.pause();
                        isPlaying = false;
                    }
                })
            }else{
                player = null;
                track = null;
            }


        },
        addNext: function (tr) {
            var i, tmp;
            var pos1 = _.findIndex(list, {id: tr.id});
            if(pos1 === -1){
                list.push(tr);
                pos1 = list.indexOf(tr);
            }
            var pos2 = list.indexOf(track);

            if (pos1 !== pos2 && 0 <= pos1 && pos1 <= list.length && 0 <= pos2 && pos2 <= list.length) {
                tmp = list[pos1];
                if (pos1 < pos2) {
                    for (i = pos1; i < pos2; i++) {
                        list[i] = list[i + 1];
                    }
                    list[pos2] = tmp;
                }
                else {
                    for (i = pos1; i > pos2 + 1; i--) {
                        list[i] = list[i - 1];
                    }
                    list[pos2+1] = tmp;
                }
            }
        },
        getTrack: function() {
            return track;
        },
        play: function() {
            if(player && !isPlaying){
                player.play();
                isPlaying = true;
            }
        },
        pause: function() {
            if(player && isPlaying){
                player.pause();
                isPlaying = false;
            }
        },
        getIsPlaying: function() {
            return isPlaying;
        },
        rewind: function(){
            player.currentTime = 0;
        },
        seek: function(t){
            player.currentTime = t;
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