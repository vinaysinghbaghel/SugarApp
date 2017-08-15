var typeAhead = angular.module('venderprofile', []);
typeAhead.directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    $scope: {
      items: '=',
      prompt: '@',
      title: '@',
      subtitle: '@',
      model: '=',
      onSelect: '&amp;',
      controller:'vendorprofileController'
    },
    link: function($scope,$rootScope, elem, attrs) {
    $scope.handleSelection = function(selectedItem) {
    $scope.model = selectedItem;
    
   scope:{
         someArray:selectedItem
         }
    $scope.current = 0;
    $scope.selected = true;
    $timeout(function() {
      //  $scope.onItemSelected();
    }, 200);
    };
    $scope.current = 0;
    $scope.selected = true; // hides the list initially
    $scope.isCurrent = function(index) {
    return $scope.current == index;
    };
    $scope.setCurrent = function(index) {
    $scope.current = index;
    };
    },
  // controller: ['$scope', '$element', '$attrs',
  //           function ($scope, $element, $attrs) {
  //               // observe changes in attribute - could also be scope.$watch
  //               $attrs.$observe('yourDirective', function (selectedItem) {
  //                   if (selectedItem) {
  //                       console.log(selectedItem,'huuuuuuuuuuuuuuuuuuuuuuuuuuuu');
  //                       // pass value to app controller
  //                       $scope.variable = value;
  //                   }
  //               });
  //           }
  //       ]

  };

});

