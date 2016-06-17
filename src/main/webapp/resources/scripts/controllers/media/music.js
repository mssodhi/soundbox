'use strict';

angular.module('app').controller('MusicCtrl', function ($http, CredentialsService, FavoritesService, profile, MusicService, $uibModal, PlaylistService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    var sb_date, sb_title, sb_duration, sb_count, sb_artist = false;
    var sb_plays = true;

    ctrl.init = function () {
        ctrl.showInitList = true;
        ctrl.q = '';
        ctrl.getFavorites();

        PlaylistService.getPlaylists().$promise.then(function (response) {
            ctrl.playlists = response;
        })
    };

    ctrl.createPlaylist = function () {
        var playlist = {
            name: 'Untitled',
            isNew: true
        };
        ctrl.playlists.push(playlist);
    };

    ctrl.addPlaylist = function (playlist) {
        PlaylistService.addPlaylist({name: playlist.name}).$promise.then(function (res) {
            if(res.id){
                ctrl.playlists.splice(ctrl.playlists.indexOf(playlist), 1);
                ctrl.playlists.push(res);
            }
        })
    };

    ctrl.removePlaylist = function (playlist) {
        PlaylistService.removePlaylist(playlist).$promise.then(function (response) {
            ctrl.playlists.splice(ctrl.playlists.indexOf(playlist), 1);
        });
    };

    ctrl.search = function (query) {
        return SC.get('/search/', {q: query, limit: 10}).then(function (response) {
            return response.collection;
        });
    };

    ctrl.selectFromTypeahead = function (obj) {
        if(obj.kind === 'user'){
            ctrl.getSpecificArtist(obj.id);
        }
        if(obj.kind === 'track'){
            ctrl.getSpecificTrack(obj);
        }
    };
    
    ctrl.getSpecificArtist = function (id) {
        SC.get('/users/' + id).then(function(response){
            ctrl.setArtist(response);
        });
    };

    ctrl.getSpecificTrack = function (track) {
        ctrl.getSpecificArtist(track.user.id);
        ctrl.select(track);
    };

    ctrl.setArtist = function (artist) {
        ctrl.artist = artist;
        ctrl.showInitList = false;
        ctrl.getTracks();
    };

    ctrl.select = function (track) {
        SC.stream('/tracks/' + track.id, {autoPlay: true}).then(function (player) {
            MusicService.setPlayer(player, track);
            MusicService.setList(ctrl.tracks);
        });
    };

    ctrl.getFavorites = function(){
        FavoritesService.getFavorites({}).$promise.then(function (response) {
            ctrl.favorites = [];
            ctrl.tracks = [];
            for(var i = 0; i < response.length; i++){
                SC.get('/users/' + response[i].artist_id).then(function(artist){
                    ctrl.favorites.push(artist);
                    SC.get('/tracks', {user_id: artist.id, limit: 500}).then(function (tracks) {
                        for(var i = 0; i < tracks.length; i++){
                            ctrl.tracks.push(tracks[i]);
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

    ctrl.addFavorite = function(artist){
        FavoritesService.addFavorite({}, artist.id).$promise.then(function(){
            ctrl.favorites.push(artist);
        });
    };

    ctrl.removeFavorite = function(artist){
        FavoritesService.removeFavorites({}, artist.id).$promise.then(function(){
            var index = ctrl.favorites.indexOf(artist);
            ctrl.favorites.splice(index, 1);
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

    ctrl.isFavorite = function (artist) {
        for(var i = 0; i < ctrl.favorites.length; i++){
            if(ctrl.favorites[i].id == artist.id){
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