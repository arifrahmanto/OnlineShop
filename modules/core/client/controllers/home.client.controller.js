'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$stateParams',
  function ($scope, Authentication, $stateParams) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    if ($stateParams.categoryId) {
      $scope.category = $stateParams.categoryId;
    } else {
      $scope.category = 'Bestsellers';
    }
    // Some example string
    $scope.helloText = 'Welcome in INSPINIA MEAN.JS Boilerplate';
    $scope.descriptionText = 'It is an application skeleton for a typical MEAN web app. You can use it to quickly bootstrap your project.';

  }
]);
