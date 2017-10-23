
var app = angular.module('settingCtrl', [])

// .controller('settingController',


  // function($scope,$http, $rootScope) {

    // var app = angular.module('myApp', []);

app.service('Map', function($q) {
    
    this.init = function() {
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13,
            disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }
    
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }
    
});

app.controller('settingController', function($rootScope,$scope,$http, Map,settingService) {
    
    $scope.merchantregister = {};
    
    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                // $scope.merchantregister.name = res.name;
                $scope.merchantregister.lat = res.geometry.location.lat();
                $scope.merchantregister.lng = res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }
    
      $scope.registermerchant = function(lat, lng, title) {
    
   var fd = new FormData();
    // var location= [$scope.merchantregister.lng, $scope.merchantregister.lat];
     fd.append("file",$("#profileimage")[0].files[0]);
      console.log($scope.merchantregister.name,'jiiiiiiiiiiiiiiiiiiiiiiiiiii')
        var url = "/api/registermerchant?name="+$scope.merchantregister.name+"&email="+$scope.merchantregister.email+"&contactnumber="+$scope.merchantregister.phone+"&contactperson="+$scope.merchantregister.contactperson+"&merchantcategory="+$scope.merchantregister.merchantcategory+"&merchantlevel="+$scope.merchantregister.merchantlevel+"&merchantjyflevel="+$scope.merchantregister.merchantjyflevel+"&address="+$scope.merchantregister.address+"&Lat="+$scope.merchantregister.lat+"&Lng="+$scope.merchantregister.lng;
        $http.post(url, fd, {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}
        }).success(function(data) {
         if (!data.success) {
         $rootScope.errorMessage = data.message;
         } else {
  $rootScope.showLoading = false;      
         }
     });
      }
    Map.init();
  $scope.getmerchantlevel =function(){
    settingService.getmerchantlevel({}).then(function(res) {
     $scope.item = res;
      console.log($scope.items,'call in controllers')
   });
    }
$scope.getjyfmerchantlevel =function(){
    settingService.getjyfmerchantlevel({}).then(function(res) {
     $scope.items = res;
      console.log($scope.items,'call in controllers')
   });
    }
});

  //   $scope.merchantregister = {};

  //   $scope.merchantregister.markerLat = 23.200000;
  //   $scope.merchantregister.markerLng = 79.225487;
  //   $scope.merchantregister.infoTitle = 'India';

  //   var india = new google.maps.LatLng($scope.merchantregister.markerLat, $scope.merchantregister.markerLng);

  //   var mapOptions = {
  //     zoom : 4,
  //     center : india,
  //     mapTypeId : google.maps.MapTypeId.TERRAIN
  //   }

  //   $scope.map = new google.maps.Map(document.getElementById('map'),
  //       mapOptions);

  //   $scope.markers = [];

  //   var infoWindow = new google.maps.InfoWindow();

  
  //     var latLang = new google.maps.LatLng(lat, lng);

  //     var marker = new google.maps.Marker({
  //       map : $scope.map,
  //       position : latLang,
  //       title : title
  //     });
  //     marker.content = '<div class="infoWindowContent">'
  //         + marker.title + '</div>';

  //     google.maps.event.addListener(marker, 'click', function() {
  //       infoWindow.setContent('<h2>' + marker.title + '</h2>'
  //           + marker.content);
  //       infoWindow.open($scope.map, marker);
  //     });

  //     $scope.markers.push(marker);

  //     $scope.map.setCenter(latLang);
  //   };
  //   $scope.openInfoWindow = function(e, selectedMarker) {
  //     e.preventDefault();
  //     google.maps.event.trigger(selectedMarker, 'click');
  //   }
  //  $scope.getlevel=function(){
  //    console.log('hihiihihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
  //  } 
  // });

