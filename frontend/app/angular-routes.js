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
            .state('forgotpassword', {
                url: '/forgotpassword',
                templateUrl: 'app/usermanagement/views/forgotpassword.html',
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
                controller: 'settingController'
            })
            .state('vendorprofile', {
                url: '/vendorprofile',
                templateUrl: 'app/vendormanagement/views/vendorprofile.html',
                controller: 'vendorprofileController'
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
                controller: 'dealmanagementController'
            })
            .state('deallevelallocation', {
                url: '/deallevelallocation',
                templateUrl: 'app/dealmanagement/views/deallevelallocation.html',
                controller: 'dealmanagementController'
            })
            .state('levelcreation', {
                url: '/levelcreation',
                templateUrl: 'app/setting/views/levelcreation.html',
                controller: 'vendorprofileController'
            })
            .state('livedata', {
                url: '/livedata',
                templateUrl: 'app/livedata/views/livedata.html',
                controller: 'usersController'
            })
            .state('dealdata', {
                url: '/dealdata',
                templateUrl: 'app/dealdatabase/views/dealdata.html',
                controller: 'usersController'
            })
            .state('dealdataid', {
                url: '/dealdataid',
                templateUrl: 'app/dealdatabase/views/dealdataid.html',
                controller: 'usersController'
            })
            .state('dealiddetails', {
                url: '/dealiddetails',
                templateUrl: 'app/userprofilemanagement/views/dealiddetails.html',
                controller: 'usersController'
            })
            .state('vendorsupport', {
                url: '/vendorsupport',
                templateUrl: 'app/vendorsupport/views/vendorsupport.html',
                controller: 'usersController'
            })
            .state('header', {
                templateUrl: 'app/dashboard/views/demo.html',
            })
            .state('sidebar', {
                templateUrl: 'app/dashboard/views/sidebar.html',
            })
            .state('dealmanagement', {
                url: '/dealmanagement',
                templateUrl: 'app/dealmanagement/views/dealmanagementprofile.html',
                controller:'dealmanagementController'
            })
            .state('specialdealallocation', {
                url: '/specialdealallocation',
                templateUrl: 'app/dealmanagement/views/specialdealallocation.html',
                controller:'dealmanagementController'
            });
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });
