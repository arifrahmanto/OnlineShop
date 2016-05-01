(function () {
  'use strict';

  angular
  .module('products')
  .controller('ProductsListController', ProductsListController);

  ProductsListController.$inject = ['ProductsService','$location','$filter'];

  function ProductsListController(ProductsService, $location, $filter) {
    var vm = this;
    vm.curPage = 1;
    vm.pageSize = 8;
    var searchValue = $location.search();
    vm.orderSelect = '-created';
    vm.searchText = searchValue.search;

    var query = ProductsService.query();
    query.$promise.then(function(data){
      vm.products = data;
      if (searchValue.category){
        vm.filteredProducts = $filter('filter')(data, { category : searchValue.category }, true);
        vm.title = searchValue.category;
      } else {
        vm.filteredProducts = $filter('filter')(data, searchValue.search);
        vm.title = searchValue.search;
      }
      vm.numberOfPage = Math.ceil(vm.filteredProducts.length / vm.pageSize);
    });
  }
})();
