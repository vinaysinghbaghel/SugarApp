    angular.module('MainCtrl', [])
     .controller('usersController', function($scope,$rootScope,UserService,toaster,$http,$location) {

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
            showToaster('error', 'Error', response.data.message);
          }
        });
      } 
      $scope.signIn = function() {
        var res = $http.post("/signin", $scope.logindata);
        res.success(function(data) {
          if (!data.success) {
            $rootScope.errorMessage = data.message;
          } else {
            if(data.user.passwordchanged!=0)
              {
               $location.path("/dashboard");
              }else{
             $location.path("/changepassword");  
           } 
          }
        });
      };
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
    $scope.logout = function () {
          $location.path('/login');
    };
  $scope.userprofile = function() {
         var res=   $http
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
  
  console.log($scope.forgotdata ,'ggigigigigigiigigi')
    $http.post('/forgotpassword',{email:$scope.forgotdata.email}) 
    .success(function(data){
      if(data.status){
        $scope.forgotpassword = data.forgotpassword;
        $rootScope.message ="Password changed Successfully"
        // $location.path('/SendEmailToYou');     
      }
      else
      {
        $rootScope.errorMessage = data.messages; 
      }      
    })
    .error(function(error){
      console.log(error);
    });
  }

});




        // $scope.editTweet = function(tweet, index) {
        //     $scope.tweet.showSave = false;
        //     $scope.tweet.text = tweet.tweet;
        //     updateObj = tweet;
        //     updateObj.index = index;
        // };

        // $scope.cancel = function() {
        //     $scope.tweet.text = '';
        //     $scope.tweet.showSave = true;
        // };

        // $scope.updateTweet = function() {

        //     if ($scope.tweet.text === '') {
        //         return false;
        //     }

        //     $http
        //         .put('/api/tweets/' + updateObj._id, {
        //             'tweet': $scope.tweet.text
        //         })
        //         .then(function(res) {
        //             if (res.status === 200) {
        //                 $scope.tweetList[updateObj.index] = res.data.data;
        //                 $scope.tweet = {
        //                     'text': '',
        //                     'showSave': true
        //                 };
        //                 updateObj = {};
        //             } else {
        //                 /* Handle error */
        //             }
        //         }, function(res) {
        //             /* Handle error */
        //         });
        // };

        // $scope.deleteTweet = function(tweet, index) {
        //     $http
        //         .delete('/api/tweets/' + tweet._id)
        //         .then(function(res) {
        //             if (res.status === 200) {
        //                 $scope.tweetList.splice(index, 1);
        //             } else {
        //                 /* Handle error */
        //             }
        //         }, function(res) {
        //             /* Handle error */
        //         });
        // };
    // }]);