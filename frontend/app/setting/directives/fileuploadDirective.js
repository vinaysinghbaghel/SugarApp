'use strict';
angular.module('settingCtrl').directive('fileread', ['$parse','toaster', function ($parse,toaster) {
      return {
      scope: {
        fileread: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.fileread = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
          //scope.file = (e.srcElement || e.target).files[0];
          //scope.setFile(scope.file,attr.id);
        });
      }
    };
}]);