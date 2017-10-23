(function(){  
  var config = {
        apiKey: "AIzaSyDFlsisAa2yeDhRjSPdoC6Ez0UjOrSf9sc",
        authDomain: "firechat-demo-app.firebaseapp.com",
        databaseURL: "https://firechat-demo-app.firebaseio.com"
      };
  firebase.initializeApp(config);
  

 angular.module('vendorCtrl',['firebase'])
 .controller('vendorController',['$scope','$rootScope','$http','$timeout',function($scope,$rootScope,$http,$timeout){
 
//         var chatRef = firebase.database().ref()
        
//          var ele = angular.element("#firechat-container");
       

//         chat = new FirechatUI(chatRef,ele);
//          var res = $http
//         .get('/api/vendorsupport')
//          res.success(function(data){
//          var email = data.email;
//          var password = data.password;
//          var auth = firebase.auth;
//          auth().signInWithEmailAndPassword(email,password).catch(function(error) {
//          // Handle Errors here.
//          var errorCode = error.code;
//          var errorMessage = error.message;
        
//          // ...
//          });
//         $scope.logout= function() {
//          firebase.auth().signOut().then(function() {
         
//          }).catch(function(error) {
//           console.log("Error signing user out:", error);
//          });
//          }
         
//         auth().onAuthStateChanged(function(user) {
//         if (user) {
//             var userId = user.uid,
//                 userName = user.displayName;
//             chat.setUser(userId, userName);

//             $timeout(function() {
//                 chat._chat.enterRoom('-KBLofTk2mb6AJCTSc5C');
//             }, 2000);
//               console.log('User is login')
//         } else {

//             $timeout(function() {
//                 chat._chat.enterRoom('-KBLofTk2mb6AJCTSc5C');
//             }, 2000);
//                console.log('User is not login')
//         }
//     });
    
//  })  
var chatRef = firebase.database().ref();

      // Create an instance of Firechat
      var chat = new FirechatUI(chatRef, angular.element("#firechat-container"));

      // Listen for authentication state changes
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // If the user is logged in, set them as the Firechat user
          chat.setUser(user.uid, "Anonymous" + user.uid.substr(10, 8));
        } else {
          // If the user is not logged in, sign them in anonymously
          firebase.auth().signInAnonymously().catch(function(error) {
            console.log("Error signing user in anonymously:", error);
          });
        }
      });

    }])
}());