'use strict';

angular.module('app').controller('MusicCtrl', function ($http, CredentialsService, FavoritesService, profile, MusicService) {
    var ctrl = this;
    ctrl.currentUser = profile;
    ctrl.tracks = [];
    ctrl.artists = [];
    ctrl.favorites = [];

    var sb_date, sb_title, sb_duration, sb_count, sb_artist = false;
    var sb_plays = true;

    ctrl.init = function () {
        CredentialsService.getSoundCloudCredentials().$promise.then(function (response) {
            SC.initialize({
                client_id: response.id,
                secret_token: response.secret,
                redirect_uri: 'http://localhost:8080/test/#/'
            });
        });
        ctrl.showInitList = true;
        ctrl.showArtists = false;
        ctrl.getFavorites();
    };

    ctrl.getFavorites = function(){
        FavoritesService.getFavorites({email: ctrl.currentUser.email}).$promise.then(function (response) {
            ctrl.favorites = [];
            ctrl.tracks = [];
            for(var i = 0; i < response.length; i++){
                SC.get('/users/' + response[i].artist_id).then(function(response){
                    ctrl.favorites.push(response);
                    SC.get('/tracks', {user_id: response.id, limit: 500}).then(function (response) {
                        for(var i = 0; i < response.length; i++){
                            ctrl.tracks.push(response[i]);
                        }
                        ctrl.tracks = _.shuffle(ctrl.tracks);
                    });
                });
            }
        })
    };

    ctrl.getTracks = function () {
        SC.get('/tracks', {user_id: ctrl.artist.permalink, limit: 500}).then(function (response) {
            if(response.length === 0){
                $http.get('http://api.soundcloud.com/tracks', {
                        params: {
                            client_id: '0f7c969c815f51078c1de513f666ecdb',
                            q: ctrl.artist.permalink
                        }
                    }).success( function (data) {
                        ctrl.tracks = _.sortBy(data, 'playback_count').reverse();
                });
            }else{
                ctrl.tracks = _.sortBy(response, 'playback_count').reverse();
            }
        });
    };

    ctrl.isFavorite = function (artist) {
        for(var i = 0; i < ctrl.favorites.length; i++){
            if(ctrl.favorites[i].id == artist.id){
                return true;
            }
        }
        return false;
    };

    ctrl.setArtist = function (artist) {
        ctrl.artist = artist;
        ctrl.showArtists = false;
        ctrl.showInitList = false;
        ctrl.getTracks();
    };

    ctrl.getArtist = function () {
        ctrl.showArtists = true;
        ctrl.artist = null;
        ctrl.tracks = null;
        SC.get('/users/', {q: ctrl.search, limit: 500}).then(function (response) {
            ctrl.artists = response;
        });
    };

    ctrl.select = function (track) {
        SC.stream('/tracks/' + track.id, {autoPlay: true}).then(function (player) {
            MusicService.setPlayer(player, track);
            MusicService.setList(ctrl.tracks);
        });
    };

    ctrl.addFavorite = function(artist){
        FavoritesService.addFavorite({email: ctrl.currentUser.email}, artist.id).$promise.then(function(){
            ctrl.getFavorites();
        });
    };

    ctrl.removeFavorite = function(artist){
        FavoritesService.removeFavorites({email: ctrl.currentUser.email}, artist.id).$promise.then(function(){
            ctrl.artist = null;
            ctrl.init();
        });
    };


    // Util methods

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