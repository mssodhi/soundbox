'use strict';

angular.module('app').controller('PlaylistCtrl', function ($http, $location, FavoritesService, profile, MusicService, PlaylistService, playlists, favorites, playlist) {

    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.playlists = playlists;
    ctrl.playlist = playlist;

    var sb_date, sb_title, sb_duration, sb_count, sb_artist = false;
    var sb_plays = true;

    ctrl.init = function () {

        ctrl.playlistNotFound = false;
        ctrl.tracks = [];

        if(playlist.id){
            for(var j = 0; j < playlist.songs.length; j++){
                $http.get('http://api.soundcloud.com/tracks/' + playlist.songs[j].track_id, {
                    params: {
                        client_id: '0f7c969c815f51078c1de513f666ecdb'
                    }
                }).success( function (data) {
                    ctrl.tracks.push(data);
                });
            }
        }else{
            ctrl.playlistNotFound = true;
            ctrl.playlist = null;
        }

        ctrl.favorites = [];
        for(var i = 0; i < favorites.length; i++){
            SC.get('/users/' + favorites[i].artist_id).then(function(artist){
                ctrl.favorites.push(artist);
            });
        }

        ctrl.q = '';
    };

    ctrl.select = function (track) {
        SC.stream('/tracks/' + track.id, {autoPlay: true}).then(function (player) {
            MusicService.setPlayer(player, track);
            MusicService.setList(ctrl.tracks);
        });
    };

    /* ********************************************************** */
    /*                   Favorites List functions                 */
    /* ********************************************************** */

    ctrl.focus = function (e) {
        e.target.focus();
    };
    
    ctrl.removeFavorite = function(artist){
        FavoritesService.removeFavorites({}, artist.id).$promise.then(function(){
            var index = ctrl.favorites.indexOf(artist);
            ctrl.favorites.splice(index, 1);
        });
    };

    ctrl.goToArtist = function (artist) {
        $location.path('/artist/' + artist.permalink);
    };

    /* ********************************************************** */
    /*                   Playlist functions                       */
    /* ********************************************************** */

    ctrl.createPlaylist = function () {
        var playlist = {
            name: 'Untitled',
            isNew: true
        };
        ctrl.playlists.push(playlist);
    };

    ctrl.addPlaylist = function (name) {
        PlaylistService.addPlaylist({name: name}).$promise.then(function (res) {
            if(res.id){
                ctrl.playlists.push(res);
            }
            name = undefined;
        });

    };

    ctrl.removePlaylist = function (playlist) {
        PlaylistService.removePlaylist(playlist).$promise.then(function () {
            ctrl.playlists.splice(ctrl.playlists.indexOf(playlist), 1);
        });
    };

    ctrl.addSongToPlaylist = function (song, playlist) {
        var duplicate = null;
        for(var i = 0; i < playlist.songs.length; i++){
            if(parseInt(playlist.songs[i].track_id) === parseInt(song.id)){
                duplicate = true;
                break;
            }
        }
        if(!duplicate){
            PlaylistService.addSongToPlaylist({songId: song.id}, playlist).$promise.then(function (response) {
                ctrl.playlists[ctrl.playlists.indexOf(playlist)] = response;
            })
        }

    };

    ctrl.showPlaylist = function (playlist) {
        $location.path('playlist/' + playlist.id);
    };

    /* ********************************************************** */
    /*                   Util functions                           */
    /* ********************************************************** */

    ctrl.isPlaying = function (track) {
        var playing = MusicService.getTrack();
        if(playing){
            if (playing.id === track.id) {
                return 'track-is-playing';
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
                if(sb_plays){
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'playback_count').reverse();
                }else{
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'playback_count');
                }
                break;
            case 'date':
                sb_date = !sb_date;
                if(sb_date){
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'created_at').reverse();
                }else{
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'created_at');
                }
                break;
            case 'title':
                sb_title = !sb_title;
                if(sb_title){
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'title');
                }else {
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'title').reverse();
                }
                break;
            case 'duration':
                sb_duration = !sb_duration;
                if(sb_duration){
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'duration').reverse();
                }else{
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'duration');
                }
                break;
            case 'favorites':
                sb_count = !sb_count;
                if(sb_count){
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'favoritings_count').reverse();
                }else{
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'favoritings_count');
                }
                break;
            case 'artist':
                sb_artist = !sb_artist;
                if(sb_artist){
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'user.username');
                }else{
                    ctrl.tracks = _.sortBy(ctrl.tracks, 'user.username').reverse();
                }
                break;
        }
    };
});