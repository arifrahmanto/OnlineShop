(function() {
  'use strict';

  angular
    .module('products')
    .controller('GoogleImportController', GoogleImportController);

  GoogleImportController.$inject = ['$scope'];

  function GoogleImportController($scope) {
    var vm = this;

    // Google import controller logic
    // ...

    init();

    function init() {
    }
  }
})();
