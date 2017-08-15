angular.module('venderprofileCtrl', [])
    .controller('vendorprofileController', function($scope, $rootScope, vendorprofileService, $http, $location) {
        $scope.levelcreation = {};
        $scope.availablestatus=[];
        // var socket = io.connect();
        $scope.getVendorProfile = function() {
            vendorprofileService.getVendorProfile({}).then(function(res) {
                $scope.items = res;
            });
            $scope.name = ''; // This will hold the selected item
            $scope.onItemSelected = function() { // this gets executed when an item is selected
            };

        };
        $scope.regularlevelcreation = function() {
            var res = $http
                .post('/api/regularlevelcreation', $scope.levelcreation)
            res.success(function(data) {
                if (data.success) {
                    $rootScope.errorMessage = data.message;
                } else {
                    $rootScope.showLoading = false;
                }
            });
        };
        $scope.jyflevelcreationdata = function() {
            var res = $http
                .post('/api/jyflevelcreation', $scope.jyflevelcreation)
            res.success(function(data) {
                if (data.success) {
                    $rootScope.errorsMessage = data.message;
                } else {
                    $rootScope.showLoading = false;
                }
            });
        };
        $scope.getAvailabledeals = function() {
      
         setInterval(function(){
          var res = $http
              .get('/api/getavailabledeals')
          res.success(function(data){
            if(data.success)
              {
            $scope.availablestatus=data.data; 
              }else{
            $scope.errorMessage(data.message)
              }
          })    
           }, 1000);
        };
        $scope.dealmanagementlifecircle = function(){
        // setInterval(function(){
          var res = $http
              .get('/api/dealmanagementlifecircle')
          res.success(function(data){
            if(data.success)
              {
             $scope.dealdata=data.data; 
             $rootScope.dealdata = angular.copy(data.data);
              $location.path('/dealmanagementlifecycle');
              }else{
            $scope.errorMessage(data.message)
              }
          })    
        //   }, 2000);
        };
        $scope.dealdata = function(){
        // setInterval(function(){
          var res = $http
              .get('/api/dealdata')
          res.success(function(data){
            if(data.success)
              {
             $scope.dealdataids=data.data; 
                //  $scope.dealdata = data.data;
            //   $location.path('/dealmanagementlifecycle');
              }else{
            $scope.errorMessage(data.message)
              }
          })    
        //   }, 2000);


        };
     $scope.getVendorProfilefordeallifecircle = function() {
          console.log($scope.someArray,'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN') 
            vendorprofileService.getVendorProfile({}).then(function(res) {
                $scope.items = res;
            });
             $scope.name = ''; // This will hold the selected item
             
        };
            //  $scope.handleSelection = function(data) { // this gets executed when an item is selected
            //      console.log(data,'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN')    
            // };

});
    