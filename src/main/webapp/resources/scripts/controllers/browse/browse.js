'use strict';

angular.module('app').controller('BrowseCtrl', function ($http, profile, RecommendService, $location, PlaylistService, FollowService) {
    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.tracks = [];
    var limit = 15;
    ctrl.artist_grid = true;
    ctrl.pl_grid = true;

    ctrl.init = function () {
        getPlaylists();
        getFollowing();
        getRecommendations();
    };

    function getRecommendations() {
        RecommendService.get({id: ctrl.currentUser.fb_id}).$promise.then(function (recommendations) {
            for(var i = 0; i < recommendations.length; i++){
                SC.get('/search/', {q: recommendations[i], limit: 20}).then(function (res) {
                    // three objs from each collection
                    var y = 0;
                    for(var a = 0; (a === res.collection.length || y < 1 )&& ctrl.tracks.length < limit; a++){
                        var obj = res.collection[a];
                        if(obj.kind === 'track'){
                            if(!_.some(ctrl.tracks, obj)){
                                ctrl.tracks.push(obj);
                                y++;
                            }
                        }
                    }
                });
            }
        })

    }

    function getPlaylists() {
        PlaylistService.getPlaylists({id: ctrl.currentUser.fb_id}).$promise.then(function (response) {
            ctrl.playlists = response;
        });
    }

    function getFollowing() {
        FollowService.getFollowing({id: ctrl.currentUser.fb_id}).$promise.then(function (res) {
            ctrl.following = res;
        });
    }
    ctrl.goToArtist = function (artist) {
        $location.path('artist/'+ artist.username);
    };

    ctrl.clickSearch = function () {
        var search = document.getElementById("search");
        search.focus();
    };

    ctrl.unfollow = function(artist){
        FollowService.follow({id: ctrl.currentUser.fb_id}, artist.fb_id).$promise.then(function () {
            var index = _.findIndex(ctrl.following, function (following) {
                return following.fb_id === artist.fb_id;
            });
            ctrl.following.splice(index, 1);
        });
    };

    ctrl.deletePlaylist = function (playlist) {
        PlaylistService.removePlaylist(playlist).$promise.then(function () {
            ctrl.playlists.splice(ctrl.playlists.indexOf(playlist), 1);
        });
    };

    ctrl.addPlaylist = function () {
        if(ctrl.name.length > 0){
            PlaylistService.addPlaylist({name: ctrl.name, id: ctrl.currentUser.fb_id}).$promise.then(function (res) {
                if(res.id){
                    ctrl.playlists.push(res);
                    ctrl.showForm = false
                }
                ctrl.name = '';
            });
        }

    };

    ctrl.goToPlaylist = function (playlist) {
        $location.path('playlist/' + playlist.id);
    };

});