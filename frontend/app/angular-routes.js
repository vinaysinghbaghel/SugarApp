'use strict';

angular
    .module('appRoutes', ['toaster'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $stateProvider
             .state('home', {
                url: '/',
                templateUrl: 'app/usermanagement/views/signin.html',
                controller: 'usersController'
            })
            // .state('signup', {
            //     url: '/registration',
            //     templateUrl: 'app/usermanagement/views/usersregistration.view.html',
            //     controller: 'usersController'
            // });
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });
