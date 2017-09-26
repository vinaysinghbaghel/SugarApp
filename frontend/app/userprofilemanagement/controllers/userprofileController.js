angular.module('userprofileCtrl', [])
  .controller('userprofileController', function($scope,$rootScope,dataFactory,$http,$location) {
     $scope.userProfileList=[];
     $scope.dealhistorydata={};
  $scope.getUserProfile = function() {   
    dataFactory.get({}).then(function(res) {
    $scope.items = res;
  });
   $scope.name = ''; // This will hold the selected item
   $scope.onItemSelected = function() { // this gets executed when an item is selected
  };
                
 };
 $scope.userdealdeatails = function() {
  var res=$http
    .post('/api/userdealdetails', $scope.dealhistorydata)
    res.success(function(data) {
    if (data.success) {
    $rootScope.errorMessage = data.message;
    } else {
    $rootScope.showLoading = false;
          
    }
    });
 }; 
 $scope.createuserprofile = function(){
     var res=$http.post('api/createuserprofile',$scope.userprofiledata)
     res.success(function(data){
         if(data.success){
             $scope.errorMessage = data.message;
         }else{
             $scope.showLoading=false;
         }
     })
 }
 $scope.getDealHistory = function(custID) {   
    dataFactory.getdealhistory({
              id: custID},function(response) {
        if (response && response.data && response.data.data) {
           $rootScope.user = angular.copy(response.data.data);
           $location.path('/userdealhistory');
        } else {
        
        }
      });
 };
    $scope.dealid = function(custID) {   
    dataFactory.dealid({
              id: custID},function(response) {
        if (response && response.data && response.data.data) {
           $rootScope.user = angular.copy(response.data.data);
           
           $location.path('/dealiddetails');
        } else {

       }
      });
 };
  $scope.getTodayRegisterUser = function (){
     var res = $http
        .get('/api/gettodayregisteruser', {
            
        })
    res.success(function(data) {
        if (data.success) {
            $scope.getTodayRegisterUser=data.data;
            $scope.errorMessage = data.message;
        } else {
            $scope.errorMessage = data.message; 
        }
    });

};  
  $scope.getRegisterUserTillDate = function (){
     var res = $http
        .get('/api/getRegisterUserTillDate', {
            
        })
    res.success(function(data) {
        if (data.success) {
            $scope.getRegisterUserTillDate=data.data;
            $scope.errorMessage = data.message;
        } else {
            $scope.errorMessage = data.message; 
        }
    });

};  
});
