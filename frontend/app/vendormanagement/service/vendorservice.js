var typeAhead = angular.module('vendorService', []);

typeAhead.factory('vendorprofileService', function($http) {
  return {
    getVendorProfile: function(url) {
      return $http.get('/api/vendorprofiledata').then(function(resp) {
        return resp.data.data; // success callback returns this
      });
    }
  }
});
