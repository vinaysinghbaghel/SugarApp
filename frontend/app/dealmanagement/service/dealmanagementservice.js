var typeAhead = angular.module('dealmanagementService', []);

typeAhead.factory('dealmanagementService', function($http) {
  var savedata={};
  return {
    
    getmerchantProfile: function(url) {
      return $http.get('/api/merchantprofiledata').then(function(resp) {
        return resp.data.data; // success callback returns this
      });
    },
    // setdata: function(data) {

    //    return savedata=data; // success callback returns this
    // },
    // getdata:function(){
    //   return savedata;
    //  },

    }
  
});
