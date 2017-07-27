
angular.module('settingCtrl', [])

.controller('registermerchantController',


  function($scope,$http) {
    $scope.merchantregister = {};
    $scope.merchantregister.markerLat = 23.200000;
    $scope.merchantregister.markerLng = 79.225487;
    $scope.merchantregister.infoTitle = 'India';

    var india = new google.maps.LatLng($scope.merchantregister.markerLat, $scope.merchantregister.markerLng);

    var mapOptions = {
      zoom : 4,
      center : india,
      mapTypeId : google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    $scope.addMarker = function(lat, lng, title) {
    
     var fd = new FormData();
    //  console.log($("#profileimage")[0].files[0],'hiiii fd is cantain')
      //  fd.append('file', $("#profileimage")[0].files[0]);
       fd.append("file",$("#profileimage")[0].files[0]);
        var url = "/api/registermerchant?name="+$scope.merchantregister.name+"&email="+$scope.merchantregister.email+"&contactnumber="+$scope.merchantregister.phone+"&contactperson="+$scope.merchantregister.contactperson+"&merchantcategory="+$scope.merchantregister.merchantcategory+"&merchantlevel="+$scope.merchantregister.merchantlevel+"&address="+$scope.merchantregister.address+"&markerLat="+$scope.merchantregister.markerLat+"&markerLng="+$scope.merchantregister.markerLng;
        $http.post(url, fd, {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}
        })    
      var latLang = new google.maps.LatLng(lat, lng);

      var marker = new google.maps.Marker({
        map : $scope.map,
        position : latLang,
        title : title
      });
      marker.content = '<div class="infoWindowContent">'
          + marker.title + '</div>';

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<h2>' + marker.title + '</h2>'
            + marker.content);
        infoWindow.open($scope.map, marker);
      });

      $scope.markers.push(marker);

      $scope.map.setCenter(latLang);
    };
    $scope.openInfoWindow = function(e, selectedMarker) {
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    }
  }

);