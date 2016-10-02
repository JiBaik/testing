'use strict';

angular.module('hooplaAngularTest.models', ['ngResource']);
angular.module('hooplaAngularTest', ['hooplaAngularTest.models','ngAnimate', 'LocalStorageModule', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .constant('Constants', {
    // visit https://app.hoopla.net/configuration/settings to provision a Client ID and Secret.
    CLIENT_ID     : '9ce06c3a-63cc-48c9-b71e-2023c3ae19d8',
    CLIENT_SECRET : 'RaIqluMuwRl6/AEmghUgGXfoxEBYT+o+J8UNDN395rk=',
    API_PREFIX    : 'https://api.hoopla.net'
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('metrics', {
        url: '/',
        templateUrl: 'app/views/metrics.html',
        controller: 'MetricsCtrl'
      })
      .state('metricitem', {
        url: '/metric/:metricurl',
        templateUrl: 'app/views/metricitem.html',
        controller: 'MetricItemCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
