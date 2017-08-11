angular.module('dealmanagementCtrl', [])
  .controller('dealmanagementController', function($scope,$rootScope,dealmanagementService,$http,$location) {
     $scope.levelcreation = {};
     $scope.specialdealdata = {};
   $scope.getmerchantProfile = function() {   
     dealmanagementService.getmerchantProfile({}).then(function(res) {
     $scope.items = res;
   });
  };
  $scope.deallevelallocation=function(venderdata){
     $rootScope.venderobj = angular.copy(venderdata);
     $location.path('/deallevelallocation')
  };
  $scope.getmerchantid =function(venderid){
    console.log(venderid,'data for silver')
   var res=$http
    .post('/api/merchantid',{venderid:venderid,levelname:'silver'} )
    res.success(function(data) {
    if (!data.success) {
    $scope.errorMessage = data.message;
    } else {
    // $rootScope.showLoading = false;     
    }
    });
  };
   $scope.getmerchantids =function(venderid){
    console.log(venderid,'data for gold')
   var res=$http
    .post('/api/merchantids',{venderid:venderid,levelname:'gold'} )
    res.success(function(data) {
    if (!data.success) {
    $scope.errorMessage = data.message;
    } else {
    // $rootScope.showLoading = false;     
    }
    });
  };  
   $scope.getmerchantsid =function(venderid){
    console.log(venderid,'data for dimonds')
   var res=$http
    .post('/api/merchantsid',{venderid:venderid,levelname:'dimonds'} )
    res.success(function(data) {
    if (!data.success) {
    $scope.errorMessage = data.message;
    } else {
    // $rootScope.showLoading = false;     
    }
    });
  };   
  $scope.specialallocation = function(data){
     $rootScope.specialallocationobj = angular.copy(data);
     $location.path('/specialdealallocation')
  };
  $scope.specialdealallocation = function(data){
    var dataobj={
      venderID:$scope.specialallocationobj,
      name:$scope.specialdealdata.names,
      setnumberofdeals:$scope.specialdealdata.setnumberofdeals,
      settimeduration:$scope.specialdealdata.settimeduration
    }
    var res=$http
    .post('/api/specialdealallocation',dataobj )
    res.success(function(data) {
    if (!data.success) {
    $scope.errorMessage = data.message;
    } else {
    $scope.errorMessage = data.message;
    }
    });
    
  }    
  });

  