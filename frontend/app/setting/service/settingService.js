 angular.module('settingService', [])

.factory('settingService', function($http) {
  return {
    getmerchantlevel: function(url) {
        console.log('call in service')
      return $http.get('/api/getmerchantlevel').then(function(resp) {
        return resp.data.data; // success callback returns this
      });
    },
     getjyfmerchantlevel: function(url) {
        console.log('call in service')
      return $http.get('/api/getjyfmerchantlevel').then(function(resp) {
        return resp.data.data; // success callback returns this
      });
    }
  }
});
