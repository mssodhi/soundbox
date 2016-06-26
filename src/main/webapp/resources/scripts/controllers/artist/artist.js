'use strict';

angular.module('app').controller('ArtistCtrl', function ($http, $routeParams, FavoritesService, favorites, MusicService, PlaylistService) {

    var ctrl = this;
    var sb_date, sb_title, sb_duration, sb_artist = false;
    var sb_plays = true;

    ctrl.init = function () {
        ctrl.q = '';
        validateArtist();
        getPlaylists();
        getFavorites();
    };

    function validateArtist () {
        ctrl.artistNotFound = false;
        // get tracks by user
        SC.get('/users/' + $routeParams.permalink).then(function(response){
            ctrl.artist = response;
            getTracks(response);
        }).catch(function (error) {
            if(error.status === 404){
                ctrl.artistNotFound = true;
            }
        });
    }

    function getPlaylists() {
        PlaylistService.getPlaylists().$promise.then(function (response) {
            ctrl.playlists = response;
        });
    }

    function getFavorites() {
        ctrl.favorites = [];
        for(var i = 0; i < favorites.length; i++){
            SC.get('/users/' + favorites[i].artist_id).then(function(artist){
                ctrl.favorites.push(artist);
            });
        }
    }

    function getTracks (artist) {
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
    }

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
        FavoritesService.addFavorite({}, artist.id).$promise.then(function (response) {
            SC.get('/users/' + response.artist_id).then(function(artist){
                ctrl.favorites.push(artist);
            });
        });
    };

    /* ********************************************************** */
    /*                   Playlist functions                       */
    /* ********************************************************** */
    
    
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
        return _.some(ctrl.favorites, {id: artist.id});
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