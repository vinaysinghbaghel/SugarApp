'use strict';

angular
    .module('appRoutes', ['toaster'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $stateProvider
             .state('home', {
                url: '/login',
                templateUrl: 'app/usermanagement/views/signin.html',
                controller: 'usersController'
            })
             .state('signup', {
                url: '/signup',
                templateUrl: 'app/usermanagement/views/usersregistration.view.html',
                controller: 'usersController'
            })
            .state('changepassword', {
                url: '/changepassword',
                templateUrl: 'app/usermanagement/views/changepassword.html',
                controller: 'usersController'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/views/dashboard.html',
                controller: 'usersController'
            })
            .state('userprofile', {
                url: '/userprofile',
                templateUrl: 'app/userprofilemanagement/views/usermanagement.html',
                controller: 'usersController'
            })
            .state('userprofiledetails', {
                url: '/userprofiledetails',
                templateUrl: 'app/userprofilemanagement/views/userprofile.html',
                controller: 'usersController'
            });
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });
