'use strict';

angular
    .module('appRoutes', ['toaster'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $stateProvider
             .state('home', {
                url: '/',
                templateUrl: 'app/authentication/views/signin.html',
                controller: 'usersController'
            })
             .state('signup', {
                url: '/signup',
                templateUrl: 'app/authentication/views/usersregistration.view.html',
                controller: 'usersController'
            })
            .state('changepassword', {
                url: '/changepassword',
                templateUrl: 'app/authentication/views/changepassword.html',
                controller: 'usersController'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/views/dashboard.html',
                controller: 'usersController'
            });
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });
