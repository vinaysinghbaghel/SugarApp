angular.module('livedataCtrl', [])
    .controller('livedataController', function($scope, $rootScope, $http, $location) {
       $scope.getTodayRegisterUser = function(){
          var res = $http
              .get('/api/gettodayregisteruser')
          res.success(function(data){
            if(data.success)
            {
            $scope.getTodayRegisterUser=data.data; 
            }else{
            // $scope.errorMessage(data.message)
            }
          })    
        };
       $scope.getNewRegisteredMerchantToday = function(){
          var res = $http
              .get('/api/getnewregistermerchanttoday')
          res.success(function(data){
            if(data.success)
            {
            $scope.registermerchanttoday=data.data; 
            }else{
            // $scope.errorMessage(data.message)
            }
          })    
        }; 
    $scope.getDealsForToday = function(){
          var res = $http
              .get('/api/getdealsfortoday')
          res.success(function(data){
            if(data.success)
            {
            $scope.getdealsfortoday=data.data; 
            }else{
            // $scope.errorMessage(data.message)
            }
          })    
        };
    $scope.getDealsAlive = function(){
          var res = $http
              .get('/api/getdealsalive')
          res.success(function(data){
            if(data.success)
            {
            $scope.getdealsalive=data.data; 
            }else{
            // $scope.errorMessage(data.message)
            }
          })    
        };
    $scope.getDealsCompletedToday = function(){
          var res = $http
              .get('/api/getdealscompletedtoday')
          res.success(function(data){
            if(data.success)
            {
            $scope.getdealscompletedtoday=data.data; 
            }else{
            // $scope.errorMessage(data.message)
            }
          })    
        };             
});
    