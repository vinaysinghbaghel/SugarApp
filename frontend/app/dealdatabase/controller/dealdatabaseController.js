angular.module('dealdatabaseCtrl', [])
    .controller('dealdatabaseController', function($scope, $rootScope, vendorprofileService, $http, $location) {
       $scope.getdealdatabaseProfile = function() {
          vendorprofileService.getVendorProfile({}).then(function(res) {
                $scope.items = res;
            });
            $scope.name = ''; // This will hold the selected item
            $scope.onItemSelected = function() { // this gets executed when an item is selected
            };

        };
        $scope.dealdata = function(){
          var res = $http
              .get('/api/dealdata')
          res.success(function(data){
            if(data.success)
            {
            $scope.dealdataids=data.data; 
            }else{
            $scope.errorMessage(data.message)
            }
          })    
        };
});
    