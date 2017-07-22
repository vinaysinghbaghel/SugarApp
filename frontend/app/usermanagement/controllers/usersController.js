
    angular.module('MainCtrl', [])
     .controller('usersController', function($scope,$rootScope,UserService,toaster,$http,$location) {
        var showToaster = function(type, title, message) {
        toaster.pop(type, title, message);
        };

        var clearToaster = function() {
        toaster.clear();
        };

        $scope.signupdata={}
        $scope.logindata={}
        $scope.changepassworddata={}
      $scope.signUp = function() {
        UserService.createUser({
          user:$scope.signupdata
        }, function(response) {
          if (response && response.data && response.data.success) {
            showToaster('success', 'Success', response.data.message);
            console.log('success', 'Success', response.data.message)
           
          } else {
            showToaster('error', 'Error', response.data.message);
          }
        });
      } 
      $scope.signIn = function() {
        // $scope.showToaster('wait', "Easybill Says", "Login...");
        var res = $http.post("/signin", $scope.logindata);
        res.success(function(data) {
          if (!data.success) {
            $rootScope.showLoading = false;
            $rootScope.errorMessage = data.message;
          } else {
            console.log(data,'HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIii')
            if(data.user.passwordchanged!=0)
              {
                //  $location.path("/changepassword");  
                 $location.path("/dashboard");
              }else{
            //  $rootScope.login = data.email;
            //  $rootScope.showLoading =false;
            //  $rootScope.user = angular.copy(data.user);
             $location.path("/changepassword");  
              // $location.path("/dashboard"); 
            // $scope.clearToaster();
           } // $scope.showToaster('error', "Easybill Says", data.message);
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
        console.log($scope.changepassworddata,'vinnnauassudadanffnsfnsfjfjsfbksfkjfkdsfbdsfksfkjfb')
        var res = $http.post("/changepassword", $scope.changepassworddata);
        res.success(function(data) {
          if (data.success) {
             $location.path("/login");   
            
          } else {
            $rootScope.showLoading = false;
            $rootScope.errorMessage = data.message;
            //  $rootScope.login = "yes";
            //  $rootScope.showLoading =false;
            //  $rootScope.user = angular.copy(data.user);
            //  $location.path("/login");   
            // $scope.clearToaster();
            // $scope.showToaster('error', "Easybill Says", data.message);
          }
        });
      };
     $scope.logout = function(){
         console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
         $location.path("/login");   
    // $http.get('/logout')
    //  var res = $http.post("/logout");
    // res.success(function(data){
    //   clearInterval($rootScope.refreshIntervalId);
    //   if(data.success){
    //    $location.path("/login");   
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

// $scope.getTweets = function() {
        //     $http
        //         .get('/api/tweets')
        //         .then(function(res) {
        //             if (res.status === 200) {
        //                 $scope.tweetList = res.data.data;
        //             } else {
        //                 /* Handle error */
        //             }
        //         }, function(res) {
        //             /* Handle error */
        //         });
        // };

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