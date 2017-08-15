angular.module('dealmanagementCtrl', [])
  .controller('dealmanagementController', function($scope,$rootScope,dealmanagementService,$http,$location,$window,$modal) {
     $scope.levelcreation = {};
     $scope.specialdealdata = {};
// $scope.open = function () {
//     var modalInstance = $modal.open({
//     controller: 'dealmanagementController',
//     templateUrl: 'myModalContent.html',
//     });

//     };
$scope.modalEmailbilling = {};
    $scope.animationsEnabled = true;
    $scope.open = function(url) {
      $scope.modalQrImage = url;
      $scope.modalEmailbilling = url;
      $scope.modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'dealmanagementController',
        scope: $scope
      });
    };

    $scope.close = function() {
      $scope.modalInstance.close();
    };

$scope.getmerchantProfile = function() {
dealmanagementService.getmerchantProfile({}).then(function(res) {
        $scope.items = res;
    });
};
$scope.deallevelallocation = function(venderdata) {
    $rootScope.venderobj = angular.copy(venderdata);
    $location.path('/deallevelallocation')
};
$scope.getidforsilver = function(venderid) {
    if ($window.confirm("Are you sure you want to Deal Level Allocation")) {
        $scope.Message = "You clicked YES.";
    } else {
        $scope.Message = "You clicked NO.";
    }
    var res = $http
        .post('/api/merchantid', {
            venderid: venderid,
            levelname: 'silver'
        })
    res.success(function(data) {
        if (!data.success) {
            $scope.errorMessage = data.message;
        } else {
           $scope.errorMessage = data.message;     
        }
    });
};
   $scope.getidforgold = function(venderid) {
    if ($window.confirm("Are you sure you want to Deal Level Allocation")) {
        $scope.Message = "You clicked YES.";
    } else {
        $scope.Message = "You clicked NO.";
    }
    var res = $http
        .post('/api/merchantids', {
            venderid: venderid,
            levelname: 'gold'
        })
    res.success(function(data) {
        if (!data.success) {
            $scope.errorMessage = data.message;
        } else {
            $scope.errorMessage = data.message;     
        }
    });
};
$scope.getidfordiamonds = function(venderid) {
    if ($window.confirm("Are you sure you want to Deal Level Allocation")) {
        $scope.Message = "You clicked YES.";
    } else {
        $scope.Message = "You clicked NO.";
    }
    var res = $http
        .post('/api/merchantsid', {
            venderid: venderid,
            levelname: 'dimonds'
        })
    res.success(function(data) {
        if (!data.success) {
            $scope.errorMessage = data.message;
        } else {
            $scope.errorMessage = data.message; 
        }
    });
};
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

}
});

  