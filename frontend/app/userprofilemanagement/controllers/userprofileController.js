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
 $scope.getDealHistory = function(custID) {   
   console.log(custID,'hiihhihihiihihihhiihihihih')
    dataFactory.getdealhistory({
              id: custID},function(response) {
        if (response && response.data && response.data.data) {
          console.log(response.data.data.dealtype,'hiiiiiiiiiiiiiiiiiiiiii biiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
           $rootScope.user = angular.copy(response.data.data);
           $location.path('/userdealhistory');
        } else {
        //   showToaster('error', 'Error', response.data.message);
        }
      });
  //   dataFactory.getdealhistory({custID}).then(function(res) {
  //   $scope.items = res;
  // });    
//    $http
//                 .post('/api/dealhistorydata',{custID})
//                 .then(function(res) {
//                     if (res.status === 200) {
//                         $scope.tweetList = res.data.data;
//                     } else {
//                         /* Handle error */
//                     }
//                 }, function(res) {
//                     /* Handle error */
//                 });
 };
});
