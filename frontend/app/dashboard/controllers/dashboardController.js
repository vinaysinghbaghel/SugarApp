angular.module('dashboardCtrl', [])
     .controller('dashboardController', function($scope,$rootScope,UserService,toaster,$http,$location) {

    //   $scope.logout = function() {
    //    console.log('HIiiiiiii vinay hiw r u ')
    //     delete $rootScope.user;
    //     delete $rootScope.bodylayout;
    //     var res = $http.post("/signout");
    //     res.success(function(data, status, headers, config) {
    //       if (data.success) {
    //          $location.path("/login");   
            
    //       }
    //     });
    //   };  
     $scope.logout = function(){
         console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
    // $http.get('/logout')
    // .success(function(data){
    //   clearInterval($rootScope.refreshIntervalId);
    //   if(data.success){
    //     $window.location = data.redirectUrl;
    //   } else {
    //     console.log(data);
    //     alert(data.message);
    //   }
    // })
    // .error(function(error){
    //   console.log(error);
    // });
  }
});