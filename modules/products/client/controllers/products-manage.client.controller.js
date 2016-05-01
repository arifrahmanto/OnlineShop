(function() {
  'use strict';

  angular
    .module('products')
    .controller('ProductsManageController', ProductsManageController);

  ProductsManageController.$inject = ['ProductsService','$scope','NgTableParams', '$filter'];

  function ProductsManageController(ProductsService, $scope, NgTableParams, $filter) {
    var vm = this;

    $scope.productsTable = new NgTableParams({
      page: 1,
      count: 10
    }, {
      //total: $scope.products.length,
      getData: function ($defer, params) {
        var query = ProductsService.query();
        query.$promise.then(function(result){
          params.total(result.length);
          $scope.data = params.sorting() ? $filter('orderBy')(result, params.orderBy()) : result;
          $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
          $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
          $defer.resolve($scope.data);
        });
      }
    });
    // Products manage controller logic
    // ...

    init();

    function init() {
    }
  }
})();
