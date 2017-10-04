
// angular.module('UserService')
//   .factory('', ['$http', '$q', function($http, $q) {

//     return {

//       createUser: function(data, callback) {
//           console.log(data.user,'data in service')
//         // $http({
//         //   method: 'POST',
//         //   url: 'registeruser',
//         //   data: data
//         // })
        
//             return $http.post('/app/registeruser', data);
       
//         // .then(
//         //   function(response) {
//         //     callback(response);
//         //   },
//         //   function(response) {
//         //     callback(response);
//         //   }
//         // );
//       },

//     };
//   }]);


  angular.module('UserSer', []).factory('UserService', ['$http', function($http) {

    return {
    createUser: function(data, callback) {
        $http({
          method: 'POST',
          url: 'userdata',
          data: data
        }).then(
          function(response) {
            callback(response);
          },
          function(response) {
            callback(response);
          }
        );
    },
    login : function(data,callback){
        $http({
          method: 'POST',
          url: '/signin',
          data: data
        }).then(
          function(response) {
            callback(response);
          },
          function(response) {
            callback(response);
          }
        );
    } , 
    logout: function(callback){
      $http({
          method: 'GET',
          url: '/logout',
        }).then(
          function(response) {
            callback(response);
          }
        );
    }
        
    }       

}]);