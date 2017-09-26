(function(window,angular,undefined){
    angular.module('vendorCtrl',[])
    .controller('vendorController',['$scope','$rootScope',function($scope,$rootScope){
    //     var vm = this;
    //     var socket = window.io("http://localhost:3000");
    //     vm.messages = [];
    //     socket.emit("test","we are passing in a massage");
    //     socket.io("receive-message",function(msg){
    //         $scope.$apply(function(){
    //         console.log("receive message");
    //         vm.messages.push(msg);
    //         });
    //     });
    //    vm.username = undefined;
    //    vm.sendMessage = function(){
    //        var newMessages = {
    //            username:vm.username,
    //            message:vm.newMessage
    //        };
    //         socket.emit("new-message",newMessage)
    //         vm.newMessage = undefined;
    //    }
    //    $rootScope.$on('new-user',function(event,username){
    //        console.log('this is working')
    //     vm.username = username;
    //    })
    // $scope.$watch(function(){
    //     return vm.username;
    // },function(){
    // if(vm.username){
    //  console.log("this is value for username",vm.username)
    // }
    //  })
    }])
})(window,window.angular)