(function () {
  'use strict';

  angular
  .module('products')
  .controller('ProductsListController', ProductsListController);

  ProductsListController.$inject = ['ProductsService','$location'];

  function ProductsListController(ProductsService, $location) {
    var vm = this;
    vm.curPage = 1;
    vm.pageSize = 8;
    var searchValue = $location.search();
    vm.searchText = searchValue.search;

    var query = ProductsService.query();
    query.$promise.then(function(data){
      vm.products = data;
      vm.numberOfPage = Math.ceil(data.length / vm.pageSize);
    });

    //https://www.googleapis.com/books/v1/volumes?q=food+allergies&maxResults=3
  }
})();
