'use strict';

angular.module('app').factory('SettingsService', function ($resource) {
    return $resource('api/settings/', {},  {
        getSettings: {method: 'GET', url: 'api/settings/getSettings/user/:id'},
        addSettings: {method: 'POST', url: 'api/settings/addSettings/user/:id'},
        updateSettings: {method: 'PUT', url: 'api/settings/updateSettings'}
    });
});