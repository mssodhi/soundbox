'use strict';

angular.module('app').component("musicTable", {
    templateUrl: 'resources/scripts/components/music-table/music-table.html',
    controllerAs: 'ctrl',
    controller: function (MusicService, PlaylistService, LikesService, $location, UserService, SongService) {
        var ctrl = this;
        ctrl.likes = [];
        ctrl.limit = 50;
        var sb_date, sb_title, sb_duration, sb_artist = false;
        var sb_plays = true;

        ctrl.init = function () {
            UserService.getCurrentUser().$promise.then(function (res) {
                ctrl.currentUser = res;
                LikesService.get({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
                    ctrl.likes = response;
                });
            });
        };

        ctrl.viewLyrics = function (song) {
            SongService.getLyrics({id: song.id}).$promise.then(function (lyrics) {
                console.log(lyrics);
            });
        };

        ctrl.goToArtist = function (artist) {
            $location.path('/artist/' + artist.username);
        };

        ctrl.likeSong = function (song) {
            LikesService.toggleLike({songId: song.id, userId: ctrl.currentUser.fb_id}).$promise.then(function (response) {
                if(ctrl.isLiked(song)){
                    var ind = _.findIndex(ctrl.likes, {song_id: song.id});
                    ctrl.likes.splice(ind,1);
                }else if(response.id){
                    ctrl.likes.push(response);
                }
            });
        };

        ctrl.addSongToPlaylist = function (song, playlist) {
            var duplicate = _.some(playlist.playlistSongs, function (playlistSong) {
                return playlistSong.id === song.id;
            });
            if(!duplicate) {
                PlaylistService.addSongToPlaylist({songId: song.id}, playlist).$promise.then(function (response) {
                    playlist.playlistSongs = response.playlistSongs;
                });
            }
        };

        ctrl.select = function (song) {
            MusicService.stream(song);
            MusicService.setList(ctrl.tracks);
        };

        ctrl.removeSongFromPlaylist = function (song) {
            if(ctrl.currentplaylist){
                PlaylistService.removeSongFromPlaylist({id: song.id}, ctrl.currentplaylist);
                ctrl.tracks.splice(ctrl.tracks.indexOf(song), 1);
                var ind = _.findIndex(ctrl.playlists, function (pl) {
                    return pl.id === ctrl.currentplaylist.id;
                });
                ctrl.playlists[ind].playlistSongs.length--;
                ctrl.currentplaylist.playlistSongs.length--;
            }
        };

        // ctrl.addToNext = function (song) {
        //     MusicService.addNext(song);
        // };

        ctrl.isLiked = function (song) {
            return _.some(ctrl.likes, function (like) {
                return like.song_id === song.id;
            });
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