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
                controller: 'userprofileController'
            })
            .state('userprofiledetails', {
                url: '/userprofiledetails',
                templateUrl: 'app/userprofilemanagement/views/userprofile.html',
            })
            .state('userdealhistory', {
                url: '/userdealhistory',
                templateUrl: 'app/userprofilemanagement/views/userdealhistory.html',
                controller: 'userprofileController'
            })
            .state('userdealhistorydetails', {
                url: '/userdealhistorydetails',
                templateUrl: 'app/userprofilemanagement/views/userdeal.html',
                controller: 'userprofileController'
            })
            .state('registermerchant', {
                url: '/registermerchant',
                templateUrl: 'app/setting/views/registernewmerchant.html',
                controller: 'registermerchantController'
                // controller: 'usersController'
            })
            .state('vendorprofile', {
                url: '/vendorprofile',
                templateUrl: 'app/vendormanagement/views/vendorprofile.html',
                controller: 'usersController'
            })
            .state('vendorcustomerlist', {
                url: '/vendorcustomerlist',
                templateUrl: 'app/vendormanagement/views/vendorcustomerlist.html',
                controller: 'usersController'
            })
            .state('dealmanagementlifecycle', {
                url: '/dealmanagementlifecycle',
                templateUrl: 'app/vendormanagement/views/dealmanagementlifecycle.html',
                controller: 'usersController'
            })
            .state('dealverification', {
                url: '/dealverification',
                templateUrl: 'app/dealmanagement/views/dealverification.html',
                controller: 'usersController'
            })
            .state('deallevelallocation', {
                url: '/deallevelallocation',
                templateUrl: 'app/dealmanagement/views/deallevelallocation.html',
                controller: 'usersController'
            })
            .state('levelcreation', {
                url: '/levelcreation',
                templateUrl: 'app/dealmanagement/views/levelcreation.html',
                controller: 'usersController'
            })
            .state('livedata', {
                url: '/livedata',
                templateUrl: 'app/livedata/views/livedata.html',
                controller: 'usersController'
            });
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });
