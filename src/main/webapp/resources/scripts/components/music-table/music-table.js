'use strict';

angular.module('app').component("musicTable", {
    templateUrl: 'resources/scripts/components/music-table/music-table.html',
    controllerAs: 'ctrl',
    controller: function (MusicService, PlaylistService) {
        var ctrl = this;

        var sb_date, sb_title, sb_duration, sb_artist = false;
        var sb_plays = true;

        ctrl.addSongToPlaylist = function (song, playlist) {
            var duplicate = null;
            for(var i = 0; i < playlist.songs.length; i++){
                if(parseInt(playlist.songs[i].track_id) === parseInt(song.id)){
                    duplicate = true;
                    break;
                }
            }
            if(!duplicate) {
                PlaylistService.addSongToPlaylist({songId: song.id}, playlist).$promise.then(function (response) {
                    playlist.songs = response.songs;
                });
            }
        };

        ctrl.select = function (track) {
            if(!ctrl.isPlaying(track)){
                SC.stream('/tracks/' + track.id, {autoPlay: false}).then(function (player) {
                    player.seek(0);
                    player.on('finish', function () {
                        player.seek(0);
                        ctrl.select(MusicService.getNext());
                    });
                    MusicService.setPlayer(player, track);
                    MusicService.setList(ctrl.tracks);
                });
            }
        };

        ctrl.removeSongFromPlaylist = function (song) {
            if(ctrl.currentplaylist){
                PlaylistService.removeSongFromPlaylist({id: song.id}, ctrl.currentplaylist);
                ctrl.tracks.splice(ctrl.tracks.indexOf(song), 1);
                var ind = _.findIndex(ctrl.playlists, function (pl) {
                    return pl.id === ctrl.currentplaylist.id;
                });
                ctrl.playlists[ind].songs.length--;
                ctrl.currentplaylist.songs.length--;
            }
        };

        ctrl.isPlaying = function (track) {
            var playing = MusicService.getTrack();
            if (playing) {
                if (playing.id === track.id) {
                    return true;
                }
            }
        };

        ctrl.milliToTime = function (milli) {
            var minutes = Math.floor(milli / 60000);
            var seconds = ((milli % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        };

        ctrl.getDate = function (date) {
            return moment(new Date(date)).format("MMM DD, YYYY");
        };

        ctrl.sort = function (sortBy) {
            switch (sortBy) {
                case 'plays':
                    sb_plays = !sb_plays;
                    if (sb_plays) {
                        ctrl.tracks = _.sortBy(ctrl.tracks, 'playback_count').reverse();
                    } else {
                        ctrl.tracks = _.sortBy(ctrl.tracks, 'playback_count');
                    }
                    break;
                case 'date':
                    sb_date = !sb_date;
                    if (sb_date) {
                        ctrl.tracks = _.sortBy(ctrl.tracks, 'created_at').reverse();
                    } else {
                        ctrl.tracks = _.sortBy(ctrl.tracks, 'created_at');
                    }
                    break;
                case 'title':
                    sb_title = !sb_title;
                    if (sb_title) {
                        ctrl.tracks = _.sortBy(ctrl.tracks, 'title');
                    } else {
                        ctrl.tracks = _.sortBy(ctrl.tracks, 'title').reverse();
                    }
                    break;
                case 'duration':
                    sb_duration = !sb_duration;
                    if (sb_duration) {
                        ctrl.tracks = _.sortBy(ctrl.tracks, 'duration').reverse();
                    } else {
                        ctrl.tracks = _.sortBy(ctrl.tracks, 'duration');
                    }
                    break;
                case 'artist':
                    sb_artist = !sb_artist;
                    if (sb_artist) {
                        ctrl.tracks = _.sortBy(ctrl.tracks, 'user.username');
                    } else {
                        ctrl.tracks = _.sortBy(ctrl.tracks, 'user.username').reverse();
                    }
                    break;
            }
        };
    },
    bindings: {
        tracks: '=',
        showartist: '<',
        showdate: '<',
        playlists: '=',
        isplaylist: '<',
        currentplaylist: '='
    }
});