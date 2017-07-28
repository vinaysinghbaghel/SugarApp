angular.module('venderprofileCtrl', [])
  .controller('vendorprofileController', function($scope,$rootScope,vendorprofileService,$http,$location) {
     $scope.levelcreation = {};
   $scope.getVendorProfile = function() {   
    vendorprofileService.getVendorProfile({}).then(function(res) {
     $scope.items = res;
   });
   $scope.name = ''; // This will hold the selected item
   $scope.onItemSelected = function() { // this gets executed when an item is selected
  };
                
  };
  $scope.regularlevelcreation = function() {
  console.log($scope.levelcreation,'coming data for regular level creation')
  var res=$http
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
  console.log($scope.jyflevelcreation,'coming data for jyf level creation')
  var res=$http
   .post('/api/jyflevelcreation', $scope.jyflevelcreation)
    res.success(function(data) {
    if (data.success) {
    $rootScope.errorsMessage = data.message;
    } else {
    $rootScope.showLoading = false;      
    }
    });
   }; 
  });