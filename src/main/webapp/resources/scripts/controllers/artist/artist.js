'use strict';

angular.module('app').controller('ArtistCtrl', function ($http, profile, $routeParams, FollowService, PlaylistService, UserService) {

    var ctrl = this;
    ctrl.currentUser = profile;

    ctrl.init = function () {
        ctrl.q = '';
        validateArtist();
        getPlaylists();
        getFollowing();
    };

    function validateArtist () {
        ctrl.artistNotFound = true;
        UserService.getArtist({username: $routeParams.permalink, id: ctrl.currentUser.fb_id}).$promise.then(function (artist) {
            if(artist.id){
                ctrl.artist = artist;
                ctrl.artistNotFound = false;
                getTracks(artist);
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

    function getTracks (artist) {
        ctrl.loading = true;
        UserService.getMusicByUser({id: artist.fb_id}).$promise.then(function (tracks) {
            ctrl.tracks = tracks;
            if(tracks.length !== artist.songs_length){
                ctrl.errorGettingAll = true;
            }
            ctrl.loading = false;
        })
    }

    /* ********************************************************** */
    /*                   Favorites List functions                 */
    /* ********************************************************** */

    ctrl.toggleFollow = function(artist){
        FollowService.follow({id: ctrl.currentUser.fb_id}, artist.fb_id).$promise.then(function (response) {
            if(response.id){
                ctrl.following.push(response.artist);
                artist.followers += 1;
            }else{
                var index = _.findIndex(ctrl.following, function (artist) {
                    return artist.fb_id === artist.fb_id;
                });
                ctrl.following.splice(index, 1);
                artist.followers -= 1;
            }
        });
    };

    ctrl.isFollowing = function (artist) {
        if(ctrl.following &&  ctrl.following.length > 0){
            return _.some(ctrl.following, function (following) {
                return following.fb_id === artist.fb_id;
            });
        }else{
            return false;
        }
    };
});