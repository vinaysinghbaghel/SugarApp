angular.module('dealmanagementCtrl', [])
  .controller('dealmanagementController', function($scope,$rootScope,dealmanagementService,$http,$location,$window) {
     $scope.levelcreation = {};
     $scope.specialdealdata = {};
     $scope.createdealdata = {};
     $scope.getdealdata = {};
$scope.getmerchantProfile = function() {
dealmanagementService.getmerchantProfile({}).then(function(res) {
        $scope.items = res;
    });
};
$scope.deallevelallocation = function(venderdata) {
    $rootScope.venderobj = angular.copy(venderdata);
    $location.path('/deallevelallocation')
};
// $scope.getidforsilver = function(venderid) {
//     if ($window.confirm("Are you sure you want to Deal Level Allocation")) {
//         $scope.Message = "You clicked YES.";
//     } else {
//         $scope.Message = "You clicked NO.";
//     }
//     var res = $http
//         .post('/api/merchantid', {
//             venderid: venderid,
//             levelname: 'silver'
//         })
//     res.success(function(data) {
//         if (!data.success) {
//             $scope.errorMessage = data.message;
//         } else {
//            $scope.errorMessage = data.message;     
//         }
//     });
// };
//    $scope.getidforgold = function(venderid) {
//          
//     // if ($window.confirm("Are you sure you want to Deal Level Allocation")) {
//     //     $scope.Message = "You clicked YES.";
//     // } else {
//     //     $scope.Message = "You clicked NO.";
//     // }
//     var res = $http
//         .post('/api/merchantids', {
//             levelname: venderid.levelname
//         })
//     res.success(function(data) {
//         if (!data.success) {
//             $scope.errorMessage = data.message;
//         } else {
//             $scope.errorMessage = data.message;     
//         }
//     });
// };
$scope.getidfordiamonds = function(venderid,data) {
    // console.log(venderid,'hii it is gold function')
    // console.log(data,'hiiihhi data is alllll')
    if ($window.confirm("Are you sure you want to Deal Level Allocation")) {
        $scope.Message = "You clicked YES.";
    } else {
        $scope.Message = "You clicked NO.";
    }
    var res = $http
        .post('/api/merchantsid', {
            venderid: venderid,
            levelname: data
        })
    res.success(function(data) {
        if (!data.success) {
            $scope.errorMessage = data.message;
        } else {
            $scope.errorMessage = data.message; 
        }
    });
};
$scope.getalllevel = function (){
    console.log('hiiiiii your welcome in getalllevel in method')
     var res = $http
        .get('/api/getalltypesoflevel', {
            
        })
    res.success(function(data) {
        if (data.success) {
            $scope.alltypeslevel=data.data;
            console.log($scope.alltypeslevel,'hiiiiiiiiiiiiiiiiiiiiiiiiiii')
            $scope.errorMessage = data.message;
        } else {
            $scope.errorMessage = data.message; 
        }
    });

}
$scope.specialallocation = function(data) {
    $rootScope.specialallocationobj = angular.copy(data);
    $location.path('/specialdealallocation')
};
$scope.specialdealallocation = function(data) {
var dataobj = {
    venderID: $scope.specialallocationobj,
    name: $scope.specialdealdata.names,
    setnumberofdeals: $scope.specialdealdata.setnumberofdeals,
    settimeduration: $scope.specialdealdata.settimeduration
}
var res = $http
    .post('/api/specialdealallocation', dataobj)
res.success(function(data) {
    if (!data.success) {
        $scope.errorMessage = data.message;
    } else {
        $scope.errorMessage = data.message;
    }
});

};
$scope.dealverification = function (){
     var res = $http
        .get('/api/dealverification', {
            
        })
    res.success(function(data) {
        if (data.success) {
            $scope.dealverification=data.data;
            console.log($scope.dealverification,'hiiiiiiiiiiiiiiiiiiiiiiiiiii')
            $scope.errorMessage = data.message;
        } else {
            $scope.errorMessage = data.message; 
        }
    });

};
$scope.getDealId = function(location){  
    
   var res = $http.post('/api/getdealid', location)
    res.success(function(data) {
        if (data.success) {
            $scope.getdealiddata=data.data;
            console.log($scope.getdealdata,'hiiiiiiiiiiiiiiiiiiiiiiiiiii')
            $scope.errorMessage = data.message;
        } else {
            $scope.errorMessage = data.message; 
        }
    });

}
$scope.close = function() {
    // var modalInstance = $modal.close();
    };

    $scope.createdealid = function() {
    var res=$http
    .post('/api/createdealid', $scope.createdealdata)
      res.success(function(data) {
          if (data.success) {
              $rootScope.errorMessage = data.message;
          } else {
              $rootScope.showLoading = false;
          
          }
      }); 
 }
});

 