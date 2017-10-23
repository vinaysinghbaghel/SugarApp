    angular.module('MainCtrl', [])
     .controller('usersController', function($scope,$window,$rootScope,UserService,$http,$location) {

        $scope.signupdata={}
        $scope.logindata={}
        $scope.changepassworddata={}
        $scope.userprofiledata={}
      $scope.signUp = function() {
        UserService.createUser({
          user:$scope.signupdata
        }, function(response) {
          if (response && response.data && response.data.success) {
            console.log('success', 'Success', response.data.message)
           $location.path("/login")
          } else {
            
          }
        });
      } 
      $scope.signIn = function(logindata) {
        var logindata = $scope.logindata;
        // var res = $http.post("/signin", $scope.logindata);
        // console.log(logindata,'jiiiiiiiiiiiiiiii login data')
        UserService.login(
           logindata
        ,function(data){

        if (!data.data.success) {
            $rootScope.errorMessage = data.message;
            console.log($rootScope.errorMessage,'login erroorr')
              toaster.pop('success', "title", "text");
          } else {
            if(data.data.user.passwordchanged!=0)
              {
               $location.path("/dashboard");
              }else{
             $location.path("/changepassword");  
           } 
          }
        })
        // .success(function(data) {
        //   if (!data.success) {
        //     $rootScope.errorMessage = data.message;
        //   } else {
        //     if(data.user.passwordchanged!=0)
        //       {
        //        $location.path("/dashboard");
        //       }else{
        //      $location.path("/changepassword");  
        //    } 
        //   }
        // });
      };
      // $scope.header = function(){
        
      // }
      $rootScope.logout = function(){
       $http.get('/logout')
      .success(function(data){
       clearInterval($rootScope.refreshIntervalId);
        if(data.success){
         $window.location = data.redirectUrl;
        } else {
         console.log(data);
         alert(data.message);
        }
      })
      .error(function(error){
       console.log(error);
      });
      }
      $scope.changePassword = function(form) {
        // $scope.showToaster('wait', "Easybill Says", "Login...");
         $rootScope.errorMessage = '';
        if(!form.$valid){     
          $rootScope.submitted = true;
          return;
        } 
        // else if($scope.signup.password.length > 20){
        //   $rootScope.submitted = true;
        //   $rootScope.errorMessage = 'Password should not be greater than 20 characters.';
        //   return;
        // }
        else if($scope.changepassworddata.password != $scope.changepassworddata.conformpassword){
          $rootScope.submitted = true;
          $rootScope.errorMessage = 'Password and confirm password does not matched.';
          return;
        }  
        // else if(!$scope.signup.acceptterms || $scope.signup.acceptterms == undefined){
        //   $rootScope.submitted = true;
        //   $rootScope.errorMessage = 'Please accept the Terms and conditions and Privacy Policy.';
        //   return;
        // } 
        var res = $http.post("/changepassword", $scope.changepassworddata);
        res.success(function(data) {
          if (data.success) {
             $location.path("/login");   
            
          } else {
            $rootScope.showLoading = false;
            $rootScope.errorMessage = data.message;
          }
        });
      };
  $scope.userprofile = function() {
    var res=$http
    .post('/api/userprofile', $scope.userprofiledata)
      res.success(function(data) {
          if (data.success) {
              $rootScope.errorMessage = data.message;
          } else {
              $rootScope.showLoading = false;
          
          }
      });
  };
  $scope.forgotpassword = function(forgotemail){  
    $http.post('/forgotpassword',{email:$scope.forgotdata.email}) 
    .success(function(data){
      if(!data.status){
        $scope.errorMessage = data.messages;
      } else{
        $scope.errorMessage = 'Your new password has been mailed, please check email.';
      }      
    })
    .error(function(error){
      console.log(error);
    });
  }

});
