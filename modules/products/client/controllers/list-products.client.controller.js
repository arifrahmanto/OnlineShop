(function () {
  'use strict';

  angular
  .module('products')
  .controller('ProductsListController', ProductsListController);

  ProductsListController.$inject = ['ProductsService'];

  function ProductsListController(ProductsService) {
    var vm = this;
    vm.curPage = 1;
    vm.pageSize = 4;
    var query = ProductsService.query();
    query.$promise.then(function(data){
      vm.products = data;
      vm.numberOfPage = Math.ceil(data.length / vm.pageSize);
    });
  }
})();
