
    angular.module('MainCtrl', [])
     .controller('usersController', function($scope,UserService,toaster,$http) {
        var showToaster = function(type, title, message) {
        toaster.pop(type, title, message);
        };

        var clearToaster = function() {
        toaster.clear();
        };

        $scope.tweet={}
        $scope.logindata={}
      $scope.saveTweet = function() {
        UserService.createUser({
          user:$scope.tweet
        }, function(response) {
          if (response && response.data && response.data.success) {
            showToaster('success', 'Success', response.data.message);
            console.log('success', 'Success', response.data.message)
           
          } else {
            showToaster('error', 'Error', response.data.message);
          }
        });
      } 
      $scope.signin = function() {
        console.log($scope.logindata,'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
        // if (!$scope.logindata.email || $scope.logindata.password) {
        //   // $scope.showToaster('error', "Easybill Says", "Please enter the Username & Password.");
        //   console.log('error', "Easybill Says", "Please enter the Username & Password.")
        //   return;
        // }
        // $scope.showToaster('wait', "Easybill Says", "Login...");
        var res = $http.post("/signin", $scope.logindata);
        // res.success(function(data, status, headers, config) {
        //   $scope.clearToaster();
        //   console.log(data.user);
        //   if (data && data.user && data.user.userid) {
        //     $rootScope.user = data.user;
        //     $location.path("/dashboard");
        //   } else {
        //     $scope.clearToaster();
        //     $scope.showToaster('error', "Easybill Says", data.message);
        //   }
        // });
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