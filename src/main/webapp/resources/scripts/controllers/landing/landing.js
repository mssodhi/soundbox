'use strict';

angular.module('app').controller('LandingCtrl', function ($http, $location, FavoritesService, profile, MusicService, PlaylistService, favorites, $interval) {
    var ctrl = this;
    ctrl.currentUser = profile;

    var sb_date, sb_title, sb_duration, sb_count, sb_artist = false;
    var sb_plays = true;

    ctrl.init = function () {
        ctrl.showInitList = true;
        ctrl.q = '';
        ctrl.getFavorites();
        getPlaylists();
        $interval(getPlaylists, 2000);
    };

    ctrl.print = function (obj) {
        console.log(obj);
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
    
    ctrl.goToArtist = function (artist) {
        $location.path('/artist/'+ artist.permalink);
    };

    ctrl.getFavorites = function(){
        ctrl.favorites = [];
        ctrl.tracks = [];
        var limit = 0;
        if(favorites.length < 10){
            limit = 20
        }else if(favorites.length > 50){
            limit = 10;
        }else{
            limit = 15;
        }

        for(var i = 0; i < favorites.length; i++){
            SC.get('/users/' + favorites[i].artist_id).then(function(artist){
                ctrl.favorites.push(artist);
            });
            SC.get('/tracks', {user_id: favorites[i].artist_id, limit: limit}).then(function (tracks) {
                for(var i = 0; i < tracks.length; i++){
                    ctrl.tracks.push(tracks[i]);
                }
                ctrl.tracks = _.shuffle(ctrl.tracks);
            });
        }
    };

    ctrl.removeFavorite = function(artist){
        FavoritesService.removeFavorites({}, artist.id).$promise.then(function(){
            var index = ctrl.favorites.indexOf(artist);
            ctrl.favorites.splice(index, 1);
        });
    };

    /* ********************************************************** */
    /*                   Playlist functions                       */
    /* ********************************************************** */

    function getPlaylists() {
        PlaylistService.getPlaylists().$promise.then(function (response) {
            ctrl.playlists = response;
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
        if(!duplicate) {
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