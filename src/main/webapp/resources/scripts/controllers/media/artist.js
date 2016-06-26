'use strict';

angular.module('app').controller('ArtistCtrl', function ($http, $location, $route, $routeParams, FavoritesService, profile, MusicService, PlaylistService, $interval) {

    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.favorites = []
    var sb_date, sb_title, sb_duration, sb_count, sb_artist = false;
    var sb_plays = true;

    ctrl.init = function () {
        ctrl.artistNotFound = false;
        
        // get tracks by user
        SC.get('/users/' + $routeParams.permalink).then(function(response){
            ctrl.artist = response;
            ctrl.getTracks(response);
        }).catch(function (error) {
            if(error.status === 404){
                ctrl.artistNotFound = true;
            }
        });

        ctrl.q = '';
        
        getPlaylists();
        $interval(getPlaylists, 2000);
    };

    ctrl.print = function (obj) {
        console.log(obj);
    };

    ctrl.getTracks = function (artist) {
        SC.get('/tracks', {user_id: artist.permalink, limit: 500}).then(function (response) {
            if(response.length === 0){
                $http.get('http://api.soundcloud.com/tracks', {
                    params: {
                        client_id: '0f7c969c815f51078c1de513f666ecdb',
                        q: artist.permalink
                    }
                }).success( function (data) {
                    if(data.length === 0){
                        ctrl.tracks = [];
                    }else{
                        ctrl.tracks = _.sortBy(data, 'playback_count').reverse();
                    }
                });
            }else{
                ctrl.tracks = _.sortBy(response, 'playback_count').reverse();
            }
        });
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

    ctrl.addFavorite = function(artist){
        FavoritesService.addFavorite({}, artist.id);
    };

    /* ********************************************************** */
    /*                   Playlist functions                       */
    /* ********************************************************** */

    function getPlaylists() {
        PlaylistService.getPlaylists().$promise.then(function (response) {
            ctrl.playlists = response;
        });
        FavoritesService.getFavorites().$promise.then(function (response) {
            ctrl.favorites = response;
        })
    }
    
    ctrl.addSongToPlaylist = function (song, playlist) {
        var duplicate = null;
        for(var i = 0; i < playlist.songs.length; i++){
            if(parseInt(playlist.songs[i].track_id) === parseInt(song.id)){
                duplicate = true;
                break;
            }
        }
        if(!duplicate){
            PlaylistService.addSongToPlaylist({songId: song.id}, playlist);
        }

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

    ctrl.isFavorite = function (artist) {
        for(var i = 0; i < ctrl.favorites.length; i++){
            if(ctrl.favorites[i].artist_id == artist.id){
                return true;
            }
        }
        return false;
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