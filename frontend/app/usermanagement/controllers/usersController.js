
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
            //  $rootScope.login = "yes";
            //  $rootScope.showLoading =false;
            //  $rootScope.user = angular.copy(data.user);
             $location.path("/changepassword");   
            // $scope.clearToaster();
            // $scope.showToaster('error', "Easybill Says", data.message);
          }
        });
      };
       $scope.changePassword = function() {
        // $scope.showToaster('wait', "Easybill Says", "Login...");
        var res = $http.post("/changepassword", $scope.changepassworddata);
        res.success(function(data) {
          if (!data.success) {
            $rootScope.showLoading = false;
            $rootScope.errorMessage = data.message;
          // } else {
          //   //  $rootScope.login = "yes";
          //   //  $rootScope.showLoading =false;
          //   //  $rootScope.user = angular.copy(data.user);
          //    $location.path("/changepassword");   
            // $scope.clearToaster();
            // $scope.showToaster('error', "Easybill Says", data.message);
          }
        });
      };

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