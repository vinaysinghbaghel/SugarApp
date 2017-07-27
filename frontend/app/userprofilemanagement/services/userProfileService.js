// angular.module('UserProfileService', []).factory('UserProfileService', ['$http', function($http) {

//     return {
//           getUserProfile: function(callback) {
//         $http({
//           method: 'GET',
//           url: '/api/userprofiledata?limit='
//         }).then(
//           function(response) {
//             callback(response);
//           },
//           function(response) {
//             callback(response);
//           }
//         );
//       },

        
//     }       

// }]);

var typeAhead = angular.module('UserProfileService', []);

typeAhead.factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get('/api/userprofiledata?limit=').then(function(resp) {
        return resp.data.data; // success callback returns this
      });
    },
    // getdealhistory: function(url,data) {
    //   return $http.get('/api/dealhistorydata?limit=',data).then(function(resp) {
    //     return resp.data.data; // success callback returns this
    //   });
    // }
     getdealhistory: function(data ,callback) {
        $http({
          method: 'POST',
          url: '/api/dealhistorydata',
          data:data,
        })
        .then(
          function(response) {
            callback(response);
          },
          function(response) {
            callback(response);
          }
        );
  },
  }
});