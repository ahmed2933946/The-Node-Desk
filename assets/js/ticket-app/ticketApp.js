/*global angular */

var ticketApp = angular.module('ticketApp', ['ngResource', 'xeditable', 'lumx', 'autocomplete', 'angucomplete']).config(function ($locationProvider) {
    'use strict';
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}).run(function (editableOptions) {
    'use strict';
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});